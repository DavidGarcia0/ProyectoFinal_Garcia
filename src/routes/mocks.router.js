import express from 'express';
const router = express.Router();
import { generateMockPets } from '../mocks/petMock.js';
import { generateMockUsers } from '../mocks/userMock.js';

import Pet from '../persistence/mongo/models/Pet.js';
import User from '../persistence/mongo/models/User.js';

// GET /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
  const qty = parseInt(req.query.qty) || 100;
  const pets = generateMockPets(qty);
  res.json(pets);
});

// GET /api/mocks/mockingusers
router.get('/mockingusers', async (req, res) => {
  const qty = parseInt(req.query.qty) || 50;
  const users = await generateMockUsers(qty);
  res.json(users);
});

// POST /api/mocks/generateData
router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    const insertedUsers = await User.insertMany(mockUsers);
    const insertedPets = await Pet.insertMany(mockPets);

    res.json({
      status: 'success',
      insertedUsers: insertedUsers.length,
      insertedPets: insertedPets.length
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;