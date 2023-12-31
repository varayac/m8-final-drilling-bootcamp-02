const { User, Bootcamp } = require('../models');
const bcrypt = require('bcryptjs');

// Search one user
const findUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id, {
			include: [
				{
					model: Bootcamp,
					as: 'bootcamp',
					attributes: ['id', 'title', 'cue', 'description'],
					through: {
						attributes: [],
					},
				},
			],
		});

		if (!user) {
			res.status(404).json({ message: `🥺 Usuario id: ${id} no fue encontrado` });
			return;
		}

		console.log(`Se ha encontrado al usuario ${JSON.stringify(user, null, 4)}`);
		res.status(200).json({
			message: `🎉 Usuario ${user.email} encontrado con éxito`,
			user: user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Read all users
const findAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Bootcamp,
					as: 'bootcamp',
					attributes: ['id', 'title', 'cue'],
					through: {
						attributes: [],
					},
				},
			],
		});
		console.log(`Se han encontrado los usuarios ${JSON.stringify(users, null, 4)}`);
		res.status(200).json({
			message: `🎉 Se encontraron ${users.length} usuarios`,
			users: users,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Update user
const updateUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, email, password } = req.body;
		if (!(id && email && password && firstName && lastName)) {
			res.status(400).json({ message: '🥺 Todos los campos son requeridos' });
			return;
		}
		if (password.length < 8) {
			res.status(400).json({ message: '🤔 La password debe tener mínimo 8 caracteres' });
			return;
		}
		const user = await User.findByPk(id);
		let update = [];
		let updated;

		if (user) {
			const salt = await bcrypt.genSalt(10);
			console.log('🈵SALT: ', salt);
			const encryptedPassword = await bcrypt.hash(password, salt);

			if (
				user.firstName !== firstName ||
				user.lastName !== lastName ||
				user.email !== email ||
				user.password !== encryptedPassword
			) {
				update = await User.update(
					{
						firstName,
						lastName,
						email: email.toLowerCase(),
						password: encryptedPassword,
					},
					{
						where: {
							id: id,
						},
					}
				);
				updated = update[0];
				console.log(`Actualizado: ${update}`);
				console.log(`Se ha actualizado el usuario con id: ${user.id}`);
			} else {
				updated = -1;
			}
		} else {
			updated = 0;
		}

		if (!updated) {
			res.status(404).json({ message: `🥺 El usuario id: ${id} no fue encontrado` });
			return;
		}
		res.status(201).json({
			message: `🎉 Usuario id: ${user.id} - ${user.email} fue actualizado con éxito por: ${email}`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Delete user
const deleteUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await User.destroy({
			where: { id },
		});
		if (!deleted) {
			res.status(404).json({ message: `🥺 Usuario id: ${id} no fue encontrado` });
			return;
		}
		console.log(`Borrado: ${deleted}`);
		console.log(`Usuario id ${id} fue borrado con éxito`);
		res.status(201).json({ message: `🎉 Usuario id: ${id} fue borrado con éxito` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	findUserById,
	findAllUsers,
	updateUserById,
	deleteUserById,
};
