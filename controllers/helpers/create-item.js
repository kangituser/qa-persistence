const Test = require("../../models/Test");
const aux = require('../auxilliary');
const mapItem = require('./map-item');

module.exports = async (groupId, groupTitle, ID, boardId, data) => {
   try {
    // create item
    let itemId = await aux.createItem(groupId, ID, boardId);
    // get item column data
    let [itemColumns] = await aux.getItemColumns(groupId, itemId.id, boardId);
    // map data to columns in monday 
    aux.mapDataToColumns(itemColumns, data, itemId.id, boardId);

    let mapped = mapItem(data);
    // create the test in the data-base
    await Test.create({ ...mapped, mondayGroupId: groupId, mondayItemId: itemId.id, group_name: groupTitle, item_name: itemId.name });
   } catch (err) {
     console.log(err);
   }
};
