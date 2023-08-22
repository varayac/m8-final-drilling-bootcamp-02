const Bootcamp = require('../app/models/bootcamp.model');
const sequelize = require('../app/config/db.config');

const bootcamps = [
	{
		title: 'Introduciendo El Bootcamp De React',
		cue: 10,
		description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces',
	},
	{
		title: 'Bootcamp Desarrollo Web Full Stack',
		cue: 12,
		description:
			'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS',
	},
	{
		title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
		cue: 18,
		description:
			'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning',
	},
];

(async () => {
	try {
		await Bootcamp.bulkCreate(bootcamps, { validate: true });
		console.log('🎉 Bootcamps agregados éxitosamente!!');
	} catch (error) {
		console.error('🥺 ERROR al sincronizar bootcamps: ', error.message);
	} finally {
		await sequelize.close();
	}
})();
