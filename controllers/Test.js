const HttpError = require("../models/Http-Error");
const Test = require("../models/Test");
const { groupExists, createGroup, createItemInGroup, updateItemValues, findItem } = require("../shared/queries");
const monday = require("../utils/axios");

exports.getAllTests = async (req, res, next) => {
  let tests;

  try {
    tests = await Test.findAll();
    console.log(tests);
  } catch (err) {
    return next(new HttpError("Could not fetch Tests. Please try again.", 500));
  }

  if (!tests) {
    return next(new HttpError("Could not fetch Tests. Please try again.", 404));
  }

  // console.log(tests);

  res.status(200).json({ tests });
};

exports.createTest = async (req, res, next) => {
  let { ID, module, system, screen, component, field_desc, test_desc, desired_result, project, status, group } = req.body;
  let results;

  try {
    // Create test in DB
    results = await Test.create({ ID, module, system, screen, component, field_desc, test_desc, desired_result, project, status, group }, { raw: true });
  } catch (err) {
    return next(new HttpError("Could not fetch Tests. Please try again.", 500));
  }

  if (!results) {
    return next(
      new HttpError("Could not create The test. Please try again.", 404)
    );
  }

  mapOBJtoGQL(results.dataValues, group);
};

const mapOBJtoGQL = async (obj, group) => {
  delete obj.id;
  delete obj.createdAt;
  delete obj.updatedAt;
  
  if (obj.status === 'עבר') {
    obj.status = 0;
  } else {
    obj.status = null;
  }

  console.log(obj);
  try {
    let grpExists = await monday(groupExists);
    let groupsObj = [...grpExists.data.data.boards[0].groups];
    let groups = [];

    for (let key of Object.keys(groupsObj)) {
      groups.push(groupsObj[key].title);
    }
    
    // check if test exists in group.
    if (groups.includes(group)) {
      // add to this group.
      // if item exists
      const itemId = await findItem(group);
      if (itemId) {
        // update the item.
      } else {
         // (3) create the new Item
          let createItm = createItemInGroup(group, obj.ID);
          // (4) get the item id
          let itemId = await monday(createItm);
          // (5) update the item in db
          let updatedItem = await Test.update({ mondayGroupId: groupId, mondayItemId: itemId }, { where: { ID: obj.ID }});
          // (6) update new item in monday.com
          // [*] - map the values to work with monday
          let updatedItemValues = updateItemValues(itemId, obj);
          let updateItem = await monday(updatedItemValues);
      }
    } else {
      // (1) create the group
      let createGrp = createGroup(group); 
      // (2) get the group id
      let groupId = await monday(createGrp);
      // (3) create the new Item
      let createItm = createItemInGroup(groupId, obj.ID);
      // (4) get the item id
      let itemId = await monday(createItm);
      // (5) update the item in db
      let updatedItem = await Test.update({ mondayGroupId: groupId, mondayItemId: itemId }, { where: { ID: obj.ID }});
      // (6) update new item in monday.com
      // [*] - map the values to work with monday
      let updatedItemValues = updateItemValues(itemId, obj);
      let updateItem = await monday(updatedItemValues);
    }

  } catch (error) {
    console.log(error.message);
  }
};
