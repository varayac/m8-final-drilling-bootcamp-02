const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/signUp.controller');

/** CREATE USER (SIGNUP)
METHOD:  POST
URL:     http://localhost:3000/api/signup/
BODY:
         {
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@test.com",
         "password": "Pass>a6DigitosConÑ"
         }
*/
router.post('/', createUser);

module.exports = router;
