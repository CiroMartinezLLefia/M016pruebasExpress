import express from 'express';
import { crearPedido, listarMisPedidos } from '../controladores/controladorPedidos.js';
import { protegir } from '../src/middlewares/authMiddleware.js';

const routerPedidos = express.Router();

routerPedidos.post('/', protegir, crearPedido);
routerPedidos.get('/me', protegir, listarMisPedidos);

export default routerPedidos;
