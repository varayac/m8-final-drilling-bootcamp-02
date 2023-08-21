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

/**
CREATE BOOTCAMP:   http://localhost:3000/api/bootcamp/
METHOD:            POST
BODY:
   {
     "title": "Introducción a TypeScript",
     "cue": "9",
     "description": "Lenguaje tipificado para JavaScript"
   }
*/
router.post('/', createBootcamp);

/**
ADD USER_BOOTCAMP:   http://localhost:3000/api/bootcamp/adduser/
METHOD:              POST
BODY:
   {
     "bootcampId": 1,
     "userId": 1
   }
*/
router.post('/adduser', addUserToBootcamp);

/**
SEARCH BOOTCAMP:  http://localhost:3000/api/bootcamp/1
METHOD:           GET
*/
router.get('/:id', findBootcampById);

/**
READ BOOTCAMP:    http://localhost:3000/api/bootcamp/
METHOD:           GET
*/
router.get('/', findAllBootcamps);

/**
UPDATE BOOTCAMP:   http://localhost:3000/api/bootcamp/1
METHOD:            PUT
BODY:
   {
     "title": "Introducción a TailwindCSS",
     "cue": "7",
     "description": "Personaliza coponentes con Tailwind"
   }
*/
router.put('/:id', updateBootcampById);

/**
READ BOOTCAMP:    http://localhost:3000/api/bootcamp/1
METHOD:           DELETE
*/
router.delete('/:id', deleteBootcampById);

module.exports = router;
