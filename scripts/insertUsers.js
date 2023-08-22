const User = require('../app/models/user.model');
const sequelize = require('../app/config/db.config');
const bcrypt = require('bcryptjs');

const users = [
	{
		firstName: 'Mateo',
		lastName: 'Díaz',
		email: 'mateo.diaz@correo.com',
		password: 'mateo123456',
	},
	{
		firstName: 'Santiago',
		lastName: 'Mejías',
		email: 'santiago.mejias@correo.com',
		password: 'santiago123456',
	},
	{
		firstName: 'Lucas',
		lastName: 'Rojas',
		email: 'lucas.rojas@correo.com',
		password: 'lucas123456',
	},
	{
		firstName: 'Facundo',
		lastName: 'Fernandez',
		email: 'facundo.fernandez@correo.com',
		password: 'facundo123456',
	},
];

(async () => {
	try {
		const salt = await bcrypt.genSalt(10);
		const encrypedUsers = users.map((user) => ({
			...user,
			password: bcrypt.hashSync(user.password, salt),
		}));

		await User.bulkCreate(encrypedUsers, { validate: true });
		console.log('🎉 Usuarios agregados exitosamente');
	} catch (error) {
		console.error('🥺 ERROR al sincronizar users: ', error.message);
		console.log(error);
	} finally {
		await sequelize.close();
	}
})();
