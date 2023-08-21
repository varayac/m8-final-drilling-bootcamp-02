console.clear();
require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');
const signUpRoutes = require('./app/routes/signUp.routes');
const signInRoutes = require('./app/routes/signIn.routes');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SIGNUP ENDPOINT
app.use('/api/signup', signUpRoutes);

// SIGNIN ENDPOINT
app.use('/api/signin', signInRoutes);

// USER ENDPOINTS
app.use('/api/user', userRoutes);

// BOOTCAMP ENDPOINTS
app.use('/api/bootcamp', bootcampRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));
