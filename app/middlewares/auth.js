const jwt = require('jsonwebtoken');
const util = require('node:util');
const verify = util.promisify(jwt.verify);
const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = async (req, res, next) => {
	let token;
	if (req.headers['authorization']) {
		token = req.headers['authorization'].split(' ')[1];
	} else {
		token = req.body.token || req.query.token;
	}
	if (!token) {
		res.status(403).json({ message: '👮🏻 Acceso restringido, 🪪 token es requerido!' });
		return;
	}
	try {
		const decoded = await verify(token, TOKEN_KEY);
		console.log('🪪 Decoded: ', decoded);
	} catch (error) {
		console.log('error:', error);
		res.status(401).json({ message: '👮🏻 Token no valido, acceso denegado' });
		return;
	}
	next();
};

module.exports = verifyToken;
