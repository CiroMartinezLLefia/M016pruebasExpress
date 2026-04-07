import express from "express";
import router from './routes/routesChelas.js';
import routerVinos from './routes/routesVinos.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import routerPedidos from './routes/routesPedidos.js';
import routerUsuarios from './routes/routesUsuarios.js';

dotenv.config();

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
const port = process.env.PORT || 3000;

connectDB();

app.use('/api/chelas', router);

app.use('/api/vinos', routerVinos);

app.use('/api/pedidos', routerPedidos);

app.use('/api/usuarios', routerUsuarios);

app.get('/api', (req, res) => {
    console.log("Received a request to /api path");
    res.json({ message: "BIENVENIDO A LA API" });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON invalid' });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`EL server is listening at http://localhost:${port}`);
});
// Server entry point