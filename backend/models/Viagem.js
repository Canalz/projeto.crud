const mongoose = require('mongoose');

const DestinoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

const ViagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataSaida: { type: Date, required: true },
  dataChegada: { type: Date, required: true },
  valor: { type: Number, required: true },
  destinos: [DestinoSchema],
});

module.exports = mongoose.model('Viagem', ViagemSchema);
