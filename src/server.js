// src/server.js
import app from './app.js';
import './config/mongoDB.config.js';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
