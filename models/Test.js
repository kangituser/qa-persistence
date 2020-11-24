const { DataTypes } = require("sequelize");
const dbconnect = require("../config/connection");

const Test = dbconnect.define("Test", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ID: { type: DataTypes.STRING, allowNull: true },
  module: { type: DataTypes.STRING, allowNull: true },
  system: { type: DataTypes.STRING, allowNull: true },
  screen: { type: DataTypes.STRING, allowNull: true },
  component: { type: DataTypes.STRING, allowNull: true },
  field_desc: { type: DataTypes.STRING, allowNull: true },
  test_desc: { type: DataTypes.STRING, allowNull: true },
  desired_result: { type: DataTypes.STRING, allowNull: true },
  project: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
  group: { type: DataTypes.STRING, allowNull: true },
  mondayGroupId: { type: DataTypes.STRING, allowNull: true },
  mondayItemId: { type: DataTypes.STRING, allowNull: true },
  group_name: { type: DataTypes.STRING, allowNull: true },
  item_name: { type: DataTypes.STRING, allowNull: true },
});

Test.addHook('beforeCreate', (test, options) => {
  return test.setDataValue('status', test.getDataValue('status') == true ? 'עבר' : 'לא עבר');
}) 

Test.sync({ alter: true });

module.exports = Test;
