const boardId = process.env.NODE_ENV === 'development' ? process.env.DEV_BOARD_ID : process.env.PROD_BOARD_ID;

exports.groupExists = `query {
  boards(ids: ${boardId}) { 
    groups { title }
  } 
}`;

exports.createGroup = groupName => {
  `mutation {
    create_group(borad_id: ${boardId}, group_name: ${groupName}) {
      id
    }
  }`;
};

exports.createItemInGroup = (groupId, itemName) => {
  `mutation {
    create_item (board_id: ${boardId}, group_id: ${groupId}, item_name: ${itemName}) {
      id
    }
  }`;
};

exports.updateItemValues = (itemId, values) => {
  // need to ask about the status column.
  `mutation { change_multiple_column_values 
      (board_id: ${boardId}, item_id: ${itemId}, 
        column_values: "
          {\"text\": "${values.ID}", 
          \"_____8\": "${values.module}",
          \"_____65\": "${values.system}",
          \"___\": "${values.screen}",
          \"____1\": "${values.component}",
          \"___________5\": "${values.field_desc}",
          \"____________5\": "${values.test_desc}",
          \"____________87\": "${values.desired_result}",
          \"____________0\": "${values.project}",
          \"_____47\": "{\"personsAndTeams\":[{\"id\":10921644,\"kind\":\"person\"}],\"changed_at\":\"2020-05-05T06:21:58.989Z\"}",
          \"______3\": "{\"index\":${values.status === 0 ? 3 : null},\"post_id\":null,\"changed_at\":\"${new Date().toISOString()}\"}", 
        }") { id } }`;
};

exports.findItem = (itemId) => {
  `query {
    boards (ids: ${boardId}) {
      groups (ids: "text") {
        items (ids: ${itemId}) {
          id
        }
      }
    }
  }`
};
