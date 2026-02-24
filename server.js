import express from "express";
import router from './routes/routesChelas.js';
import routerVinos from './routes/routesVinos.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

connectDB();

app.use('/api/chelas', router);

app.use('/api/vinos', routerVinos);

app.get('/', (req, res) => {
    console.log("Received a request to root path");
    res.send(`<h1 style="color: white; font-family: Arial; font-size: 67px; background-color: black; padding: 20px; text-align: center;">BIENVENIDO A MI API DE PRUEBA</h1>`);
});

app.get('/api', (req, res) => {
    console.log("Received a request to /api path");
    res.json({ message: "BIENVENIDO A LA API" });
});

app.listen(port, () => {
  console.log(`EL server is listening at http://localhost:${port}`);
});
// Server entry point