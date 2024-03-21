const {DataTypes} = require('sequelize');
const { sequelize } = require('../config');

const Employee =sequelize.define('Employee',{
    employeeName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    employeeId: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = Employee;