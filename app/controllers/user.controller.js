const { User, Bootcamp } = require('../models');

// Create new user
const createUser = async (newUser) => {
	try {
		const user = await User.create({
			firstname: newUser.firstname,
			lastname: newUser.lastname,
			email: newUser.email,
		});
		console.log(`Se a añadido al usuario ${JSON.stringify(user, null, 4)}`);
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Search one user
const findUserById = async (id) => {
	try {
		const user = await User.findByPk(id, {
			include: [
				{
					model: Bootcamp,
					as: 'bootcamp',
					through: {
						attributes: [],
					},
				},
			],
		});
		console.log(`Se ha encontrado al usuario ${JSON.stringify(user, null, 4)}`);
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Read all users
const findAllUsers = async () => {
	try {
		const users = await User.findAll({
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
		console.log(`Se han encontrado los usuarios ${JSON.stringify(users, null, 4)}`);
		return users;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Update user
const updateUserById = async (user) => {
	try {
		const updateUser = await User.findByPk(user.id);
		let updated = [];

		if (updateUser) {
			if (updateUser.firstname !== user.firstname) {
				updated = await User.update({ firstname: user.firstname }, { where: { id: user.id } });
				console.log(`Actualizados ${updated}`);
				console.log(`Se ha actualizado el usuario con id ${user.id}`);
			} else {
				updated[0] = -1;
			}
			if (updateUser.lastname !== user.lastname) {
				updated = await User.update({ lastname: user.lastname }, { where: { id: user.id } });
				console.log(`Actualizados ${updated}`);
				console.log(`Se ha actualizado el usuario con id ${user.id}`);
			} else {
				updated[0] = -1;
			}
			if (updateUser.email !== user.email) {
				updated = await User.update({ email: user.email }, { where: { id: user.id } });
				console.log(`Actualizados ${updated}`);
				console.log(`Se ha actualizado el usuario con id ${user.id}`);
			} else {
				updated[0] = -1;
			}
		} else {
			updated[0] = 0;
		}
		return updated[0];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Delete user
const deleteUserById = async (id) => {
	try {
		const deleted = await User.destroy({
			where: { id },
		});
		console.log(`Borrados: ${deleted}`);
		console.log(`Usuario id ${id} fue borrado con éxito`);
		return deleted;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
	createUser,
	findUserById,
	findAllUsers,
	updateUserById,
	deleteUserById,
};
