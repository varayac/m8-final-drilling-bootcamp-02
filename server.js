console.clear();
const express = require('express');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./app/routes/user.routes');
const {
	createBootcamp,
	AddUserToBootcamp,
	findBootcampById,
	findAllBootcamps,
	updateBootcampById,
	deleteBootcampById,
} = require('./app/controllers/bootcamp.controller');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

// NECESSARY ROUTES
// CREATE USER: http://localhost:3000/user/create/Mateo/Díaz/mateo.diaz@correo.com
app.get('/user/create/:firstName/:lastName/:email', async (req, res) => {
	const { firstName, lastName, email } = req.params;
	try {
		const user = await createUser({ firstName, lastName, email });
		res.status(StatusCodes.CREATED).json({
			message: `🎉 Usuario ${user.email} fue creado con éxito`,
			user: user,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
});

// CREATE BOOTCAMP: http://localhost:3000/bootcamp/create/Introducción%20a%20TypeScript/7/Lenguaje%20tipificado%20para%20JavaScript
app.get('/bootcamp/create/:title/:cue/:description', async (req, res) => {
	const { title, cue, description } = req.params;
	Number(cue);
	try {
		const bootcamp = await createBootcamp({ title, cue, description });
		res.status(StatusCodes.CREATED).json({
			message: `🎉 Bootcamp ${bootcamp.title} fue creado con éxito`,
			bootcamp: bootcamp,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
});

// ADD USER TO BOOTCAMP: http://localhost:3000/bootcamp/adduserbootcamp/idBootcamp/1/idUser/1
app.get('/bootcamp/adduserbootcamp/idBootcamp/:idBootcamp/idUser/:idUser', async (req, res) => {
	const idBootcamp = Number(req.params.idBootcamp);
	const idUser = Number(req.params.idUser);
	try {
		const user_bootcamp = await AddUserToBootcamp(idBootcamp, idUser);
		res.status(StatusCodes.CREATED).json({
			message: `🎉 Agregado usuario id: ${idUser} al bootcamp id: ${idBootcamp}`,
			user_bootcamp: user_bootcamp,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: error.message,
		});
	}
});
// END NECESSARY ROUTES

// USER ENDPOINTS

// BOOTCAMP ENDPOINTS
// SEARCH BOOTCAMP: http://localhost:3000/bootcamp/findById/1
app.get('/bootcamp/findById/:id', async (req, res) => {
	const id = Number(req.params.id);
	try {
		const bootcamp = await findBootcampById(id);
		if (!bootcamp) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: `🤷🏻‍♂️ Bootcamp id: ${id} no fue encontrado`,
			});
			return;
		}
		res.status(StatusCodes.OK).json({
			message: `🎉 Bootcamp ${bootcamp.title} fue encontrado con éxito`,
			bootcamp: bootcamp,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
});

// READ BOOTCAMPS: http://localhost:3000/bootcamps
app.get('/bootcamps', async (req, res) => {
	try {
		const bootcamps = await findAllBootcamps();
		res.status(StatusCodes.OK).json({
			message: `🎉 Se encontraron ${bootcamps.length} bootcamps`,
			bootcamps: bootcamps,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
});

// UPDATE BOOTCAMP: http://localhost:3000/bootcamp/update/id/1/title/Introduccion%20a%20TailwindCSS/cue/9/description/Tailwind%20personaliza%20componentes
app.get('/bootcamp/update/id/:id/title/:title/cue/:cue/description/:description', async (req, res) => {
	const { id, title, cue, description } = req.params;
	Number(id);
	try {
		const updated = await updateBootcampById({
			id,
			title,
			cue,
			description,
		});

		if (updated) {
			res.status(StatusCodes.CREATED).json({
				message: `🎉 Bootcamp id:${id} fue actualizado con éxito`,
				// bootcamp: updated,
			});
		} else {
			res.status(StatusCodes.NOT_FOUND).json({
				message: `🤷🏻‍♂️ Bootcamp id:${id} no fue encontrado`,
			});
		}
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: error.message,
		});
	}
});

// DELETE BOOTCAMP: http://localhost:3000/bootcamp/delete/id/1
app.get('/bootcamp/delete/id/:id', async (req, res) => {
	const id = Number(req.params.id);
	try {
		const deleted = await deleteBootcampById(id);
		if (!deleted) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: `🤷🏻‍♂️ Proyecto id: ${id} no existe`,
			});
			return;
		}
		res.status(StatusCodes.CREATED).json({
			message: `🎉 Proyecto id: ${id} fue borrado con éxito`,
			bootcamp: deleted,
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
});

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));
