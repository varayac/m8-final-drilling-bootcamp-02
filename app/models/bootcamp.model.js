const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bootcamp = sequelize.define('bootcamp', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cue: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isInt: true,
			min: 5,
			max: 20, // max 10?, no concuerda con material, le puse 20 : ).
		},
	},
	description: {
		type: DataTypes.STRING(1000),
		allowNull: false,
	},
});

module.exports = Bootcamp;
