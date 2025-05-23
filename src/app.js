import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


import mocksRouter from './routes/mocks.router.js';
app.use('/api/mocks', mocksRouter);

import usersRouter from './routes/users.router.js';
app.use('/api/users', usersRouter);

import petsRouter from './routes/pets.router.js';
app.use('/api/pets', petsRouter);

import adoptionRouter from './routes/adoption.router.js';
app.use('/api/adoptions', adoptionRouter);

const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

export default app;