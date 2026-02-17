import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    console.log("Received a request to /api/chelas path");
    res.json({ message: "BIENVENIDO A LA API DE PESCUEZUDAS" });
});

export default router;