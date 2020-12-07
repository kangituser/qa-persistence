const monday = require("../utils/axios");
const query = require("./query-store/querys");

module.exports = {
  groupExists: async (groupName, boardId) => {
    try {
      let { data } = await monday(query.groupExists(boardId));
      let group = data.data.boards[0].groups.filter(g => g.title == groupName);
      // console.log(group[0]);
      return group[0] ? group[0] : null;
    } catch (err) {
      console.log(err);
    }
  },
  createGroup: async (groupName, boardId) => {
    try {
      let { data } = await monday(query.createGroup(boardId, groupName));
      return {
        id: data.data.create_group.id,
        name: data.data.create_group.title
      };
    } catch (err) {
      console.log(err);
    }
  },
  createItem: async (groupId, ID, boardId) => {
    try {
      let { data } = await monday(query.createItem(boardId, groupId, ID));
      return {
        id: data.data.create_item.id,
        name: data.data.create_item.name
      };
    } catch (err) {
      console.log(err);
    }
  },
  updateItem: async (boardId, itemId, colId, values) => {
    try {
      console.log(values);
      // let { data } = await monday(query.updateColumItem(boardId, itemId, colId, value));
      console.log(data);
    } catch (err) {
      console.log(err)
    }

  },
  getItemColumns: async (groupId, itemId, boardId) => {
    try {
      let { data } = await monday(query.getItemColumns(boardId, groupId, itemId));
      return data.data.boards[0].groups[0].items.map(item => {
        if (item.id == itemId) {
          return item.column_values;
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  mapDataToColumns: (cols, data, itemId, boardId) => {
    let fields = cols;
    fields.forEach(field => {
      switch (field.title) {
        case "מודול":
          field.value = data["module"];
          break;
        case "מערכת":
          field.value = data["system"];
          break;
        case "מסך":
          field.value = data["screen"];
          break;
        case "רכיב":
          field.value = data["component"];
          break;
        case "תיאור דרישה":
          field.value = data["field_desc"];
          break;
        case "תיאור בדיקות":
          field.value = data["test_desc"];
          break;
        case "תוצאה מבוקשת":
          field.value = data["desired_result"];
          break;
        case "ID":
          field.value = data["ID"];
          break;
        case "פרוייקט":
          field.value = data["project"];
          break;
        case "תוצאות":
        case "סטאטוס":
          field.value = data["status"];
          break;
      }
    });
  
    fields.forEach(async field => {
      console.log(field);
      try {
          if (field.type === "color" && field.title === 'סטאטוס') {
          await monday(`mutation {
            change_simple_column_value (board_id: ${boardId}, item_id: ${itemId}, column_id: "${field.id}", value: ${field.value == 'עבר' ? `{\"index\":3,\"post_id\":null,\"changed_at\":\"${new Date()}\"}`: null}) {
              id
            }
          }`);
        }
        if (field.type === "text" || field.type === "long-text") {
          await monday(`mutation {
            change_simple_column_value (board_id: ${boardId}, item_id: ${itemId}, column_id: "${field.id}", value: "${field.value}") {
              id
            }
          }`);
        }
        if (field.type === "multiple-person" && field.title ==='אחראי') {
          await monday(`mutation {
            change_simple_column_value (board_id: ${boardId}, item_id: ${itemId}, column_id: "${field.id}", value: "10921644") {
              id
            }
          }`);
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  itemExists: async (groupId, itemId, boardId) => {
    try {
      let { data } = await monday(query.itemsExists(boardId, groupId));
      let res = data.data.boards[0].groups[0].items.map(item => {
        if (item.name == itemId) {
          return item;
        }
      })
      res = res.filter(r => r !== undefined);
      return res[0];
    } catch (err) {
      console.log(err);
    }
  }
};
