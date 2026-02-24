import express from "express";
import { getChelas } from '../controladores/controladorChelas.js';

const router = express.Router();

router.get('/', getChelas);

export default router;