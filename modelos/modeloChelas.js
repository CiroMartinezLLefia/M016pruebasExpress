import mongoose from "mongoose";

const chelaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    price: { type: Number, required: true }
});

export default mongoose.model('Chela', chelaSchema);