console.clear();
const express = require('express');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USER ENDPOINTS
app.use('/api/user', userRoutes);

// BOOTCAMP ENDPOINTS
app.use('/api/bootcamp', bootcampRoutes);

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

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));
