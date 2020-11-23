const Test = require("../models/Test");
const errorHandler = require("../utils/http-error");
const aux = require('./auxilliary');
const createItem = require('./helpers/create-item');

exports.getTests = async (req, res, next) => {
  let tests;

  try {
    tests = await Test.findAll({ raw: true });

    if (!tests) {
      return next(errorHandler(res, 404, "No tests found."));
    }

    res.status(200).send({ tests: tests });
  } catch (err) {
    return next(errorHandler(res, err.code, err.message));
  }
};

// create || update test
exports.createOrUpdateTest = async (req, res, next) => {
  const { ID, group } = req.body;
  const board_id = 870992980;

  try {
    // check if group exists
    let groupExists = await aux.groupExists(group, board_id);
    
    if (groupExists) {
      // check if item exists
      let groupId = groupExists.id;
      let groupTitle = groupExists.title;
      let item_Exists = await aux.itemExists(groupId, ID, board_id);
      // id, columns
      let itemId = item_Exists.id;
      let columns = item_Exists.column_values;

      if (item_Exists) {
        // update the item
        await aux.mapDataToColumns(columns, req.body, itemId, board_id);
        // add data to database
        await createItem(groupId, groupTitle, ID, board_id, req.body);

      } else {
        // create item
        await createItem(groupId, groupTitle, ID, board_id, req.body);
      }

    } else {
      // create group
      let groupId = await aux.createGroup(group, board_id);
      // create item in created group
      await createItem(groupId.id, groupId.name, ID, board_id, req.body);
    } 
  } catch (err) {
    console.log(err);
    return next(errorHandler(res, 500, err.message));
  }
};