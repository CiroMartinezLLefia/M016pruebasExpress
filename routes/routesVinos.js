import express from "express";
import { getAlbinos, getAlbinosById } from '../controladores/controladorVinos.js';

const routerVinos = express.Router();

routerVinos.get('/', (req, res) => {
    console.log("Received a request to /api/vinos path");
    const vinos = getAlbinos(req, res);
    console.log("Vinos data sent:", vinos);
});

routerVinos.get('/:id', getAlbinosById);

routerVinos.post('/', (req, res) => {
    console.log("Received a POST request to /api/vinos path");
    res.json({ message: "POST request received at /api/vinos" });
});

export default routerVinos;