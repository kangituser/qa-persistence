const Test = require("../../models/Test");
const aux = require('../auxilliary');

module.exports = async (groupId, groupTitle, ID, boardId, data) => {
   try {
    // create item
    let itemId = await aux.createItem(groupId, ID, boardId);
    // get item column data
    let [itemColumns] = await aux.getItemColumns(groupId, itemId.id, boardId);
    // map data to columns in monday 
    aux.mapDataToColumns(itemColumns, data, itemId.id, boardId);
    // create the test in the data-base
    await Test.create({ ...data, mondayGroupId: groupId, mondayItemId: itemId.id, group_name: groupTitle, item_name: itemId.name });
   } catch (err) {
     console.log(err);
   }
};
