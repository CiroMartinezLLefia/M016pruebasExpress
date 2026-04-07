import express from "express";
import { getChelas, getChelaById, createChela, deleteChela, updateChela } from '../controladores/controladorChelas.js';
import { protegir, autorizarRoles } from '../src/middlewares/authMiddleware.js';
import { upload, handleUploadError } from '../src/middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', getChelas);
router.get('/:id', getChelaById);
router.post('/', protegir, autorizarRoles('editor', 'admin'), upload.single('imagen'), handleUploadError, createChela);
router.put('/:id', protegir, autorizarRoles('editor', 'admin'), upload.single('imagen'), handleUploadError, updateChela);
router.delete('/:id', protegir, autorizarRoles('editor', 'admin'), deleteChela);

export default router;