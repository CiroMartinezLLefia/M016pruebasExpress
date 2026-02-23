import express from "express";
import { getChelas, getChelasById, createChela, updateChela, deleteChela } from '../controladores/controladorChelas.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("Received a request to /api/chelas path");
    const chelas = getChelas(req, res);
    console.log("Chelas data sent:", chelas);
});

router.get('/:id', getChelasById);

router.post('/', createChela);

router.put('/:id', updateChela);

router.delete('/:id', deleteChela);

export default router;