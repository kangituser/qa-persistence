module.exports = {
    groupExists: boardId => {
    return `query {
        boards(ids: ${boardId}) { 
          groups { 
            title
            id
          }
        } 
      }`;
  },

  itemsExists: (boardId, groupId) => {
    return `query {
        boards (ids: ${boardId}) {
          groups (ids: "${groupId}") {
            items {
              name
              id
              column_values {
                id
                title
                type
              }
            }
          }
        }
      }`;
  },

  createItem: (boardId, groupId, itemName) => {
    return `mutation {
      create_item (board_id: ${boardId}, group_id: "${groupId}", item_name: "${itemName}") {
        id
        name
      }
    }`;
  },

  createGroup: (boardId, groupName) => {
    return `mutation {
      create_group (board_id: ${boardId}, group_name: "${groupName}") {
        id
        title
      }
    }`;
  },

  getItemColumns: (boardId, groupId, itemId) => {
    return `query {
      boards (ids: ${boardId}) {
        groups (ids: "${groupId}") {
         items (ids: ${itemId}) {
          id
          name
          column_values {
            id
            type
            value
            title
          }
         }
        }
      }
    }`;
  },

  updateColumItem: (boardId, itemId, colId, value) => {
    return `mutation {
      change_simple_column_value (board_id: ${boardId}, item_id: ${itemId}, column_id: ${colId}, value: ${value}) {
        id
        }
      }`
  }
};
