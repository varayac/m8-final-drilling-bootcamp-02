const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bootcamp = sequelize.define('bootcamp', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'El title es requerido.',
			},
			notEmpty: {
				msg: 'Debe ingresar un title.',
			},
		},
	},
	cue: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isInt: true,
			min: 5,
			max: 20, // max 10?, no concuerda con material, se establece en 20 : ).
			notNull: {
				msg: 'El CUE es requerido.',
			},
			notEmpty: {
				msg: 'Debe ingresar un CUE',
			},
		},
	},
	description: {
		type: DataTypes.STRING(1000),
		allowNull: false,
		validate: {
			notNull: {
				msg: 'La description es requerida',
			},
			notEmpty: {
				msg: 'Debe ingresar una description',
			},
		},
	},
});

module.exports = Bootcamp;
