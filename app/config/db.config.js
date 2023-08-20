const { Sequelize } = require('sequelize');
require('dotenv').config();

const { PG_DATABASE, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_MAX, PG_CONNECTIONTIMEOUTMILLIS, PG_IDLETIMEOUTMILLIS } = process.env;

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
	host: PG_HOST,
	port: PG_PORT,
	dialect: 'postgres',
	pool: {
		max: Number(PG_MAX),
		min: 0,
		acquire: Number(PG_CONNECTIONTIMEOUTMILLIS),
		idle: Number(PG_IDLETIMEOUTMILLIS),
	},

	define: {
		freezeTableName: true,
		underscored: true,
	},
});

module.exports = sequelize;
