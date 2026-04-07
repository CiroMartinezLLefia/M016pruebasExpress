import mongoose from "mongoose";

const vinoSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    descripcion: { type: String, default: '' },
    tipo: { type: String, default: '' },
    graduacion: { type: Number, min: 0, max: 100, default: 0 },
    price: { type: Number, required: true, min: 0 },
    imagen: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Vino', vinoSchema);
