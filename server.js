console.clear();
require('dotenv').config();
const express = require('express');
const app = express();
const { verifySignUp, verifyToken } = require('./app/middlewares');
const { userRoutes, bootcampRoutes, signUpRoutes, signInRoutes } = require('./app/routes');

// EXPRESS MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SIGNUP ENDPOINT (Public access)
app.use('/api/signup', verifySignUp, signUpRoutes);

// SIGNIN ENDPOINT (Public access)
app.use('/api/signin', signInRoutes);

// USER ENDPOINTS (Private access)
app.use('/api/user', verifyToken, userRoutes);

// BOOTCAMP ENDPOINTS (Private access (-1))
app.use('/api/bootcamp', bootcampRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));
