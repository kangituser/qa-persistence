const { DataTypes } = require("sequelize");
const dbconnect = require("../config/db");

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
  // responsible: { type: DataTypes.STRING, allowNull: true, defaultValue: 'שבי עוזיאל' },
  // group_name: { type: DataTypes.STRING, allowNull: true },
  // group_id: { type: DataTypes.STRING, allowNull: true },
  // item_name: { type: DataTypes.STRING, allowNull: true },
  // item_id: { type: DataTypes.STRING, allowNull: true },
});

// Test.sync({ alter: true });
Test.sync();

module.exports = Test;
