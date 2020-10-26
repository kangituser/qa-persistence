const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize({
    database: 'qa_tests',
    username: 'postgres',
    password: '!Avigail1303',
    host: 'localhost',
    port: 5000,
    dialect: 'postgres'
})

module.exports = sequelize;