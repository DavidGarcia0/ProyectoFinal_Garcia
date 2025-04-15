import { Router } from 'express';
import Pet from '../persistence/mongo/models/Pet.js';

const router = Router();

// GET todas las mascotas
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
});

// GET mascota por ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar mascota' });
  }
});

export default router;