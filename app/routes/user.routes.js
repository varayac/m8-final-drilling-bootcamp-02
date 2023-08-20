const express = require('express');
const router = express.Router();
const {
	createUser,
	findUserById,
	findAllUsers,
	updateUserById,
	deleteUserById,
} = require('../controllers/user.controller');

/**
READ USERS:    http://localhost:3000/api/user
METHOD:        GET
*/
router.get('/', findAllUsers);

/**
 SEARCH USER:  http://localhost:3000/api/user/1
 METHOD:       GET
*/
router.get('/:id', findUserById);

/**
UPDATE USER:   http://localhost:3000/api/user/1
METHOD:        PUT
BODY:
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john.doe@test.com",
     "password": "MiPassMayorA8Digitos"
   }
*/
router.put('/:id', updateUserById);

/**
 DELETE USER:  http://localhost:3000/api/user/1
 METHOD:       DELETE
*/
router.delete('/:id', deleteUserById);

module.exports = router;
