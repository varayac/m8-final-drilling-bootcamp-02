const express = require('express');
const router = express.Router();
const {
	createBootcamp,
	addUserToBootcamp,
	findBootcampById,
	findAllBootcamps,
	updateBootcampById,
	deleteBootcampById,
} = require('../controllers/bootcamp.controller');

/** CREATE BOOTCAMP
METHOD:  POST
URL:     http://localhost:3000/api/bootcamp/
BODY:
         {
         "title": "Introducción a TypeScript",
         "cue": "9",
         "description": "Lenguaje tipificado para JavaScript"
         }
*/
router.post('/', createBootcamp);

/** ADD USER TO BOOTCAMP
METHOD:  POST
URL:     http://localhost:3000/api/bootcamp/adduser/
BODY:
         {
         "bootcampId": 1,
         "userId": 1
         }
*/
router.post('/adduser', addUserToBootcamp);

/** SEARCH BOOTCAMP
METHOD:  GET
URL:     http://localhost:3000/api/bootcamp/1
*/
router.get('/:id', findBootcampById);

/** READ BOOTCAMPS
METHOD:  GET
URL:     http://localhost:3000/api/bootcamp/
*/
router.get('/', findAllBootcamps);

/** UPDATE BOOTCAMP
METHOD:  PUT
URL:     http://localhost:3000/api/bootcamp/1
BODY:
         {
         "title": "Introducción a TailwindCSS",
         "cue": "7",
         "description": "Personaliza coponentes con Tailwind"
         }
*/
router.put('/:id', updateBootcampById);

/** DELETE BOOTCAMP
METHOD:  DELETE
URL:     http://localhost:3000/api/bootcamp/1
*/
router.delete('/:id', deleteBootcampById);

module.exports = router;
