import express from "express";
import { getVinos, getVinoById, createVino, updateVino, deleteVino } from '../controladores/controladorVinos.js';

const routerVinos = express.Router();

routerVinos.get('/', getVinos);

routerVinos.get('/:id', getVinoById);

routerVinos.post('/', createVino);

routerVinos.put('/:id', updateVino);

routerVinos.delete('/:id', deleteVino);

export default routerVinos;