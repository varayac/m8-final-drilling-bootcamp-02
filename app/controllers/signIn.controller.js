const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('node:util');
const sign = util.promisify(jwt.sign);
const TOKEN_KEY = process.env.TOKEN_KEY;

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).json({ message: `🥺 Los campos email y password son requeridos` });
			return;
		}

		const user = await User.findOne({
			where: { email: email.toLowerCase() },
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			res.status(401).json({ message: `👮🏻 Credenciales invalidas, verifique email o password` });
			return;
		}

		const token = await sign(
			{
				userId: user.id,
				email,
			},
			TOKEN_KEY,
			{
				expiresIn: '5m',
			}
		);

		console.log('Usuario: ' + user.email + '\nToken: ' + token);
		res.status(200).json({
			token,
			message: '🎉 Authorized',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = { login };
