import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import routerChelas from './routes/routesChelas.js';
import routerVinos from './routes/routesVinos.js';
import authRoutes from './routes/authRoutes.js';
import routerPedidos from './routes/routesPedidos.js';
import routerUsuarios from './routes/routesUsuarios.js';

dotenv.config();

const app = express();

const origins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (origins.includes(origin)) {
    return true;
  }

  // Permite despliegues y previews de Vercel para evitar bloqueos por dominios dinamicos.
  if (process.env.VERCEL && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) {
    return true;
  }

  return false;
}

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    console.error('CORS bloqueado para origen:', origin);
    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/chelas', routerChelas);
app.use('/api/vinos', routerVinos);
app.use('/api/pedidos', routerPedidos);
app.use('/api/usuarios', routerUsuarios);

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/api/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/api', (req, res) => {
  res.json({ message: 'BIENVENIDO A LA API' });
});

app.get('/', (req, res) => {
  res.json({
    service: 'vinacoteca-backend',
    status: 'ok',
    docsHint: '/api'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no trobada' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON invalid' });
  }
  if (err?.message?.includes('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  return next(err);
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Error intern del servidor' });
});

connectDB();

export default app;
