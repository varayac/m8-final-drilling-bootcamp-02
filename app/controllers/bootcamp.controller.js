const { Bootcamp, User } = require('../models');

// Create new bootcamp
const createBootcamp = async (newBootcamp) => {
	try {
		const bootcamp = await Bootcamp.create({
			title: newBootcamp.title,
			cue: newBootcamp.cue,
			description: newBootcamp.description,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// Add user to bootcamp
const AddUserToBootcamp = async (bootcampId, userId) => {
	try {
		const bootcamp = await Bootcamp.findByPk(bootcampId);
		if (!bootcamp) {
			console.log(`No se encontró el bootcamp con id: ${bootcampId}`);
			return null;
		}

		const user = await User.findByPk(userId);
		if (!user) {
			console.log(`No se encontró el usuario con id: ${userId}`);
			return null;
		}

		await bootcamp.addUser(user);
		console.log(`Agregado el usuario id: ${user.id} al bootcamp con id: ${bootcamp.id}`);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Search one bootcamp
const findBootcampById = async (id) => {
	try {
		const bootcamp = await Bootcamp.findByPk(id, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'firstname', 'lastname', 'email'],
					through: {
						attributes: [],
					},
				},
			],
		});
		console.log(`Se ha encontrado el bootcamp ${JSON.stringify(bootcamp, null, 4)}`);
		return bootcamp;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const findAllBootcamps = async () => {
	try {
		const bootcamp = await Bootcamp.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'firstname', 'lastname', 'email'],
					through: {
						attributes: [],
					},
				},
			],
		});
		console.log(`Se han encontrado los bootcamps ${JSON.stringify(bootcamp, null, 4)}`);
		return bootcamp;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Update bootcamp
const updateBootcampById = async (bootcamp) => {
	try {
		const updated = await Bootcamp.update(
			{
				name: bootcamp.name,
			},
			{
				where: { id: bootcamp.id },
			}
		);
		console.log(`Actualizados ${updated}`);
		console.log(`Bootcamp id: ${bootcamp.id} fue actualizado con éxito`);
		return updated[0];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Delete bootcamp
const deleteBootcampById = async (id) => {
	try {
		const deleted = await Bootcamp.destroy({
			where: { id },
		});
		console.log(`Borrados: ${deleted}`);
		console.log(`Bootcamp id: ${id} fue borrado con éxito`);
		return deleted;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
	createBootcamp,
	AddUserToBootcamp,
	findBootcampById,
	findAllBootcamps,
	updateBootcampById,
	deleteBootcampById,
};
