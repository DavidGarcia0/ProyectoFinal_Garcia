import { jest } from '@jest/globals';
jest.setTimeout(20000);

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import Pet from '../src/persistence/mongo/models/Pet.js';
import User from '../src/persistence/mongo/models/User.js';

beforeAll(async () => {
  try {
    console.log('🔄 Preparando conexión a MongoDB para tests...');
    
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB desconectado previamente');
    }

    await mongoose.connect('mongodb+srv://davidgarciaf0404:0T3WIaUO33fO0vHR@cluster0.kojjgtt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Conectado a MongoDB test');
    
  } catch (err) {
    console.error('Error en beforeAll:', err);
    throw err; // Para que Jest lo capture
  }
});

beforeEach(async () => {
  await mongoose.connection.collection('users').deleteMany({});
  await mongoose.connection.collection('pets').deleteMany({});
  const randomEmail = () => `test+${Date.now()}@example.com`;

    await User.create({
        name: 'Juan',
        email: randomEmail(), // evita colisiones
        password: '123456',
    });
});

afterAll(async () => {
  try {
    await mongoose.connection.collection('users').deleteMany({});
    await mongoose.connection.collection('pets').deleteMany({});
    await mongoose.disconnect();
    console.log('Colecciones limpiadas y conexión cerrada');
  } catch (err) {
    console.error('Error en afterAll:', err);
  }
});

describe('Adoption API', () => {
  let userId;
  let petId;

  beforeEach(async () => {
    const user = await User.create({ first_name: 'Test', last_name: 'User', email: 'test@example.com', password: '123', pets: [], role: 'user' });
    const pet = await Pet.create({ name: 'Firulais', species: 'dog', adopted: false });

    userId = user._id;
    petId = pet._id;
  });

  it('debe permitir que un usuario adopte una mascota disponible', async () => {
    const res = await request(app)
      .post(`/api/adoptions/${petId}/adopt`)
      .send({ userId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Adopción realizada con éxito');
    expect(res.body.pet.adopted).toBe(true);
    expect(res.body.pet.owner).toBe(userId.toString());
  });

  it('debe rechazar si la mascota ya fue adoptada', async () => {
    // Adoptar primero
    await Pet.findByIdAndUpdate(petId, { adopted: true });

    const res = await request(app)
      .post(`/api/adoptions/${petId}/adopt`)
      .send({ userId });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/ya fue adoptada/);
  });

  it('debe rechazar si el usuario no existe', async () => {
    const fakeUserId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/adoptions/${petId}/adopt`)
      .send({ userId: fakeUserId });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/Usuario no encontrado/);
  });

  it('debe rechazar si la mascota no existe', async () => {
    const fakePetId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/adoptions/${fakePetId}/adopt`)
      .send({ userId });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/Mascota no encontrada/);
  });
});