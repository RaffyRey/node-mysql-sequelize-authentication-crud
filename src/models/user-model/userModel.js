const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user_account', {
	id: {
		type: DataTypes.NUMBER,
		allowNull: false,
		autoIncrement: true,
	},
	user_id: {
		type: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	// role: {
	// 	type: DataTypes.STRING,
	// 	allowNull: false,
	// },
	lastname: {
		type: DataTypes.STRING,
	},
	firstname: {
		type: DataTypes.STRING,
	},
	username: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
	createdAt: {
		type: DataTypes.DATE,
	},
	updatedAt: {
		type: DataTypes.DATE,
	},
});

module.exports = User;
