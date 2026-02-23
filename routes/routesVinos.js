import express from "express";
import { getAlbinos, getAlbinosById, createVino, updateVino, deleteVino } from '../controladores/controladorVinos.js';

const routerVinos = express.Router();

routerVinos.get('/', (req, res) => {
    console.log("Received a request to /api/vinos path");
    const vinos = getAlbinos(req, res);
    console.log("Vinos data sent:", vinos);
});

routerVinos.get('/:id', getAlbinosById);

routerVinos.post('/', createVino);

routerVinos.put('/:id', updateVino);

routerVinos.delete('/:id', deleteVino);

export default routerVinos;