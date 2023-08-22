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
			message: `🎉 Usuario ${user.email} registrado con éxito`,
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
