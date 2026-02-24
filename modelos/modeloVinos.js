import mongoose from "mongoose";

const vinoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

export default mongoose.model('Vino', vinoSchema);
