import express from 'express';
import Pet from '../persistence/mongo/models/Pet.js';
import User from '../persistence/mongo/models/User.js';

const router = express.Router();

// POST /api/adoptions/:petId/adopt
router.post('/:petId/adopt', async (req, res) => {
  try {
    const { petId } = req.params;
    const { userId } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });
    if (pet.adopted) return res.status(400).json({ error: 'La mascota ya fue adoptada' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Actualizar mascota
    pet.adopted = true;
    pet.owner = user._id;
    await pet.save();

    // (Opcional) Agregar mascota al array de pets del usuario
    user.pets.push(pet._id);
    await user.save();

    res.status(200).json({ message: 'Adopción realizada con éxito', pet });
  } catch (error) {
    res.status(500).json({ error: 'Error interno en el servidor', details: error.message });
  }
});

export default router;
