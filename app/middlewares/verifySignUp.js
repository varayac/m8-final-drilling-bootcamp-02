const { User } = require('../models');

const verifySignUp = async (req, res, next) => {
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
		try {
			const existUser = await User.findOne({
				where: {
					email: email.toLowerCase(),
				},
			});

			if (existUser) {
				res.status(401).json({
					message: `🤔 El usuario ya existe, inicie sesion: http://localhost:3000/api/signin/`,
				});
				return;
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: error.message });
			return;
		}
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
		return;
	}
};

module.exports = verifySignUp;
