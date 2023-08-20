const { User, Bootcamp } = require('../app/models');
const sequelize = require('../app/config/db.config');

(async () => {
	try {
		await sequelize.sync({ force: true });
		console.log('🎉 Tablas sincronizadas con éxito:');
		console.log('     - user');
		console.log('     - bootcamp');
		console.log('     - user_bootcamp (middle table)');
	} catch (error) {
		console.log(error);
	} finally {
		await sequelize.close();
	}
})();
