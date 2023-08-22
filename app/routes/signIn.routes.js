const express = require('express');
const router = express.Router();
const { login } = require('../controllers/signIn.controller');

/** LOGIN (SIGNIN)
METHOD:  POST
URL:     http://localhost:3000/api/signin/
BODY:
         {
         "email": "mateo.diaz@correo.com",
         "password": "mateo123456"
         }
*/
router.post('/', login);

module.exports = router;
