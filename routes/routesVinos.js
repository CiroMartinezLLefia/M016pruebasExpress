import express from "express";
import { getVinos, getVinoById, createVino, updateVino, deleteVino } from '../controladores/controladorVinos.js';
import { protegir, autorizarRoles } from '../src/middlewares/authMiddleware.js';
import { upload, handleUploadError } from '../src/middlewares/uploadMiddleware.js';

const routerVinos = express.Router();

routerVinos.get('/', getVinos);

routerVinos.get('/:id', getVinoById);

routerVinos.post('/', protegir, autorizarRoles('editor', 'admin'), upload.single('imagen'), handleUploadError, createVino);

routerVinos.put('/:id', protegir, autorizarRoles('editor', 'admin'), upload.single('imagen'), handleUploadError, updateVino);

routerVinos.delete('/:id', protegir, autorizarRoles('editor', 'admin'), deleteVino);

export default routerVinos;