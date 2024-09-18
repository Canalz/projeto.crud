const express = require('express');
const Viagem = require('../models/Viagem');
const router = express.Router();

// Criar nova viagem
router.post('/', async (req, res) => {
  try {
    const novaViagem = new Viagem(req.body);
    const viagemSalva = await novaViagem.save();
    res.json(viagemSalva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ler todas as viagens
router.get('/', async (req, res) => {
  try {
    const viagens = await Viagem.find();
    res.json(viagens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar uma viagem
router.put('/:id', async (req, res) => {
  try {
    const viagemAtualizada = await Viagem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(viagemAtualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar uma viagem
router.delete('/:id', async (req, res) => {
  try {
    const viagemRemovida = await Viagem.findByIdAndDelete(req.params.id);
    res.json(viagemRemovida);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
