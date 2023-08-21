const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('node:util');
const sign = util.promisify(jwt.sign);
const TOKEN_KEY = process.env.TOKEN_KEY;

// Create new user
const createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!(firstName && lastName && email && password)) {
			res.status(400).json({ message: `🥺 Todos los campos son requeridos` });
			return;
		}
		if (password.length < 8) {
			res.status(400).json({ message: `👮🏻 La contraseña debe ser mayor a 8 digitos` });
			return;
		}

		const existUser = await User.findOne({
			where: {
				firstName,
				lastName,
				email,
				password,
			},
		});

		if (existUser) {
			res.status(401).json({
				message: `🥺 El usuario ya existe, inicie sesion: http://localhost:3000/api/signin/`,
			});
			return;
		}

		const salt = await bcrypt.genSalt(10);
		const enccrypedPassword = await bcrypt.hash(password, salt);
		console.log(`🈵 Password encriptada: ${enccrypedPassword}`);

		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: enccrypedPassword,
		});

		const token = await sign(
			{
				userId: user.id,
				email: user.email,
			},
			TOKEN_KEY,
			{
				expiresIn: '5m',
			}
		);
		console.log(`🪪 Token generado: ${token}`);
		console.log(`Usuario registrado: ${JSON.stringify(user, null, 4)}`);
		res.status(201).json({
			message: `🎉 Usuario ${user.email} creado y registrado con éxito`,
			user,
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createUser,
};
