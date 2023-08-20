const sequelize = require('../app/config/db.config');
const { User, Bootcamp } = require('../app/models');

const usersToBootcamps = [
	{ user_id: 1, bootcamp_id: 1 },
	{ user_id: 1, bootcamp_id: 2 },
	{ user_id: 1, bootcamp_id: 3 },
	{ user_id: 2, bootcamp_id: 1 },
	{ user_id: 2, bootcamp_id: 3 },
	{ user_id: 3, bootcamp_id: 3 },
];

(async () => {
	try {
		for (const relation of usersToBootcamps) {
			const user = await User.findByPk(relation.user_id);
			const bootcamp = await Bootcamp.findByPk(relation.bootcamp_id);

			if (user && bootcamp) {
				await user.addBootcamp(bootcamp);
				console.log(`Relación agregada: User ${user.id} - Bootcamp ${bootcamp.id}`);
			}
		}
		console.log('🎉 Relaciones user-bootcamp creadas exitosamente!!');
	} catch (error) {
		console.log('🥺 Error al crear relaciones user-bootcamp: ', error.message);
		console.log(error);
	} finally {
		await sequelize.close();
	}
})();
