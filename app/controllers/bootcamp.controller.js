const { Bootcamp, User } = require('../models');

// Create new bootcamp
const createBootcamp = async (req, res) => {
	try {
		const { title, cue, description } = req.body;
		if (!(title && cue && description)) {
			res.status(400).json({ message: '🥺 Todos los campos son requeridos' });
			return;
		}

		const existBootcamp = await Bootcamp.findOne({
			where: {
				title,
				cue,
				description,
			},
		});
		if (existBootcamp) {
			res.status(401).json({ message: '🥺 El bootcamp ya existe, no se puede añadir' });
			return;
		}

		const bootcamp = await Bootcamp.create({
			title,
			cue,
			description,
		});
		console.log(`Se ha creado el bootcamp ${JSON.stringify(bootcamp, null, 4)}`);
		res.status(201).json({
			message: `🎉 Bootcamp ${bootcamp.title} fue creado con éxito`,
			bootcamp: bootcamp,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

// Add user to bootcamp
const addUserToBootcamp = async (req, res) => {
	try {
		const { bootcampId, userId } = req.body;
		if (!(bootcampId && userId)) {
			res.status(400).json({ message: '🥺 Todos los campos son requeridos' });
		}
		const bootcamp = await Bootcamp.findByPk(bootcampId);
		if (!bootcamp) {
			console.log(`No se encontró el bootcamp con id: ${bootcampId}`);
			res.status(404).json({ message: `🤷🏻‍♂️ Bootcamp id: ${bootcampId} no fue encontrado` });
			return;
		}

		const user = await User.findByPk(userId);
		if (!user) {
			console.log(`No se encontró el user con id: ${userId}`);
			res.status(404).json({ message: `🤷🏻‍♂️ User id: ${userId} no fue encontrado` });
			return;
		}

		const user_bootcamp = await bootcamp.addUser(user);
		console.log(`Agregado el user id: ${user.id} al bootcamp con id: ${bootcamp.id}`);
		res.status(201).json({
			message: `🎉 Agregado user id: ${user.id} al bootcamp id: ${bootcamp.id}`,
			user_bootcamp: user_bootcamp,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Search one bootcamp
const findBootcampById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: '🥺 Id requerido' });
		}
		const bootcamp = await Bootcamp.findByPk(id, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'firstName', 'lastName', 'email'],
					through: {
						attributes: [],
					},
				},
			],
		});
		if (!bootcamp) {
			res.status(404).json({ message: `🥺 Bootcamp id: ${id} no fue encontrado` });
			return;
		}
		console.log(`Se ha encontrado el bootcamp ${JSON.stringify(bootcamp, null, 4)}`);
		res.status(200).json({
			message: `🎉 Bootcamp: ${bootcamp.title} fue encontrado con éxito`,
			bootcamp: bootcamp,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const findAllBootcamps = async (req, res) => {
	try {
		const bootcamps = await Bootcamp.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'firstName', 'lastName', 'email'],
					through: {
						attributes: [],
					},
				},
			],
		});
		console.log(`Se han encontrado los bootcamps ${JSON.stringify(bootcamps, null, 4)}`);
		res.status(200).json({
			message: `🎉 Se encontraron ${bootcamps.length} bootcamps`,
			bootcamps: bootcamps,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Update bootcamp
const updateBootcampById = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, cue, description } = req.body;
		Number(cue);
		if (!(id && title && cue && description)) {
			res.status(400).json({ message: '🥺 Todos los campos son requeridos' });
			return;
		}

		const bootcamp = await Bootcamp.findByPk(id);
		let update = [];
		let updated;

		if (bootcamp) {
			// pendiente
			console.log('TITLE: ', title);
			console.log('CUE: ', cue);
			console.log('DESCRIPTION: ', description);
			console.log('--------------------------------');
			console.log('DB_TITLE: ', bootcamp.title);
			console.log('DB_CUE: ', bootcamp.cue);
			console.log('DB_DESCRIPTION: ', bootcamp.description);

			// TODO: revisar esta validacion
			if (bootcamp.title !== title || bootcamp.cue !== cue || bootcamp.description !== description) {
				update = await Bootcamp.update(
					{
						title,
						cue,
						description,
					},
					{
						where: { id },
					}
				);
				updated = update[0];
				console.log(`Actualizados ${update}`);
				console.log(`Se ha actualizado el bootcamp con id: ${id}`);
			} else {
				updated = -1;
			}
		} else {
			updated = 0;
		}

		if (!updated) {
			res.status(404).json({ message: `🥺 El bootcamp id: ${id} no fue encontrado` });
			return;
		}
		res.status(201).json({
			message: `🎉 Bootcamp id: ${bootcamp.id} - ${bootcamp.title} fue actualizado con éxito por: ${title}`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// Delete bootcamp
const deleteBootcampById = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Bootcamp.destroy({
			where: { id },
		});
		console.log(`Borrados: ${deleted}`);
		console.log(`Bootcamp id: ${id} fue borrado con éxito`);
		if (!deleted) {
			res.status(404).json({ message: `🥺 Bootcamp id: ${id} no existe` });
			return;
		}
		res.status(201).json({
			message: `🎉 Bootcamp id: ${id} fue borrado con éxito`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createBootcamp,
	addUserToBootcamp,
	findBootcampById,
	findAllBootcamps,
	updateBootcampById,
	deleteBootcampById,
};
