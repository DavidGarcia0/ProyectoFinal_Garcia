# 🐾 Petstore API

API RESTful para la gestión de una tienda de mascotas. Soporta creación, adopción y gestión de usuarios y mascotas. Construida con Node.js, Express y MongoDB.

---

## 🚀 Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Docker
- Swagger (para documentación)
- Jest + Supertest (tests)

---

## 📦 Instalación local

1. Clonar el repositorio:
```
git clone https://github.com/tuusuario/petstore-api.git
cd petstore-api
```
2. Instalar dependencias:
```
npm install
```

3. Crear archivo .env:
```
PORT=3000
MONGO_URL=mongodb://localhost:27017/petstore
```

4. Correr el servidor:
```
npm run dev
```

## 🧪 Tests
```
npm test
```

## 🐳 Docker
Usar imagen de Docker desde Docker Hub
```
docker pull davidng0404/petstore-api
docker run -p 3000:3000 --env MONGO_URL=mongodb://host.docker.internal:27017/petstore davidng0404/petstore-api
```

Usar con docker-compose
```
docker-compose up --build
```

## 📚 Documentación Swagger
Una vez corriendo, acceder en:

http://localhost:8080/api/docs
Incluye documentación de los endpoints de usuarios, mascotas y adopciones.

## Endpoints principales
------------------------

GET    /api/pets                        -> Listar mascotas
GET    /api/users                       -> Listar usuarios
POST   /api/adoptions/:petId/adopt      -> Adoptar una mascota
GET    /api/mocks/mockingpets           -> Generar 100 mascotas mock
GET    /api/mocks/mockingusers          -> Generar 50 usuarios mock
POST   /api/mocks/generateData          -> Insertar N usuarios/pets en MongoDB

## Docker Hub
Ver imagen en Docker Hub:
https://hub.docker.com/r/davidng0404/petstore-api

✍️ Autor
Proyecto realizado por David Alejandro García como parte del curso de Backend con Node.js

---