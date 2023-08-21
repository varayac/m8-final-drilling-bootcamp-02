const express = require('express');
const router = express.Router();
const { findUserById, findAllUsers, updateUserById, deleteUserById } = require('../controllers/user.controller');

/** READ USERS
METHOD:  GET
URL:     http://localhost:3000/api/user
*/
router.get('/', findAllUsers);

/** SEARCH USER
METHOD:  GET
URL:     http://localhost:3000/api/user/1
*/
router.get('/:id', findUserById);

/** UPDATE USER
METHOD:  PUT
URL:     http://localhost:3000/api/user/1
BODY:
         {
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@test.com",
         "password": "MiPassMayorA8Digitos"
         }
*/
router.put('/:id', updateUserById);

/** DELETE USER
METHOD:  DELETE
URL:     http://localhost:3000/api/user/1
*/
router.delete('/:id', deleteUserById);

module.exports = router;
