const express = require('express');
const router = express.Router();
const { login } = require('../controllers/signIn.controller');

/** LOGIN (SIGNIN)
METHOD:  POST
URL:     http://localhost:3000/api/signin/
BODY:
         {
         "email": "john.doe@test.com",
         "password": "Pass>a6DigitosConÑ"
         }
*/
router.post('/', login);

module.exports = router;
