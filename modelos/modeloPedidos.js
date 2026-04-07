import mongoose from 'mongoose';

const pedidoItemSchema = new mongoose.Schema({
  tipusProducte: {
    type: String,
    enum: ['vino', 'chela'],
    required: true
  },
  producteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'items.model'
  },
  model: {
    type: String,
    enum: ['Vino', 'Chela'],
    required: true
  },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true, min: 1 },
  precioUnitario: { type: Number, required: true, min: 0 }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  items: {
    type: [pedidoItemSchema],
    validate: [(items) => items.length > 0, 'La comanda necessita almenys un producte']
  },
  total: { type: Number, required: true, min: 0 },
  observaciones: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Pedido', pedidoSchema);
