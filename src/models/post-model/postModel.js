const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Post = sequelize.define(
	'user_posts',
	{
		id: {
			type: DataTypes.NUMBER,
			allowNull: false,
			autoIncrement: true,
		},
		post_id: {
			type: DataTypes.UUIDV4,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.STRING,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		detail: {
			type: DataTypes.TEXT,
		},
		createdAt: {
			field: 'createdAt',
			type: DataTypes.DATE,
		},
		updatedAt: {
			field: 'updatedAt',
			type: DataTypes.DATE,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = Post;
