const Test = require("../../models/Test");
const aux = require('../auxilliary');
const mapItem = require("./map-item");

module.exports = async (groupId, groupTitle, itemId, itemName, boardId, data) => {
   try {
    // create item
    // let itemId = await aux.createItem(groupId, ID, boardId);
    // get item column data
    let [itemColumns] = await aux.getItemColumns(groupId, itemId, boardId);
    // map data to columns in monday 
    aux.mapDataToColumns(itemColumns, data, itemId, boardId);
   
    let mapped = mapItem(data);
    // create the test in the data-base
    await Test.create({ ...mapped, mondayGroupId: groupId, mondayItemId: itemId, group_name: groupTitle, item_name: itemName });
   } catch (err) {
     console.log(err);
   }
};
