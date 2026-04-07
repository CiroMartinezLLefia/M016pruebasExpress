import express from 'express';
import { listarUsuarios, cambiarRolUsuario } from '../controladores/controladorUsuarios.js';
import { protegir, autorizarRoles } from '../src/middlewares/authMiddleware.js';

const routerUsuarios = express.Router();

routerUsuarios.use(protegir, autorizarRoles('admin'));

routerUsuarios.get('/', listarUsuarios);
routerUsuarios.patch('/:id/rol', cambiarRolUsuario);

export default routerUsuarios;
