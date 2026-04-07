import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Usuario from '../modelos/Usuario.js';
import Vino from '../modelos/modeloVinos.js';
import Chela from '../modelos/modeloChelas.js';

dotenv.config();

async function upsertUser({ nombre, email, password, rol }) {
  let user = await Usuario.findOne({ email }).select('+password');

  if (!user) {
    user = new Usuario({
      nombre,
      email,
      password,
      rol,
      foto: ''
    });
  } else {
    user.nombre = nombre;
    user.rol = rol;
    user.password = password;
  }

  await user.save();
  return user;
}

async function ensureProducts() {
  const vinosCount = await Vino.countDocuments();
  const chelasCount = await Chela.countDocuments();

  if (vinosCount < 2) {
    await Vino.create([
      {
        name: 'Rioja Crianza Demo',
        descripcion: 'Vino tinto de prueba para validacion IA3',
        tipo: 'Tinto',
        graduacion: 13.5,
        price: 14.9,
        imagen: ''
      },
      {
        name: 'Albarino Demo',
        descripcion: 'Vino blanco de prueba para validacion IA3',
        tipo: 'Blanco',
        graduacion: 12.2,
        price: 12.5,
        imagen: ''
      }
    ]);
  }

  if (chelasCount < 2) {
    await Chela.create([
      {
        nombre: 'IPA Demo',
        descripcion: 'Cerveza IPA de prueba para validacion IA3',
        tipo: 'IPA',
        graduacion: 6.1,
        price: 4.2,
        imagen: ''
      },
      {
        nombre: 'Lager Demo',
        descripcion: 'Cerveza Lager de prueba para validacion IA3',
        tipo: 'Lager',
        graduacion: 5.0,
        price: 3.6,
        imagen: ''
      }
    ]);
  }
}

async function main() {
  await connectDB();

  await upsertUser({
    nombre: 'Admin Demo',
    email: 'admin@vinacoteca.demo',
    password: 'Demo1234!',
    rol: 'admin'
  });

  await upsertUser({
    nombre: 'Editor Demo',
    email: 'editor@vinacoteca.demo',
    password: 'Demo1234!',
    rol: 'editor'
  });

  await upsertUser({
    nombre: 'Usuari Demo',
    email: 'usuari@vinacoteca.demo',
    password: 'Demo1234!',
    rol: 'usuari'
  });

  await ensureProducts();

  console.log('Seed completado.');
  console.log('Credenciales demo:');
  console.log('- admin@vinacoteca.demo / Demo1234!');
  console.log('- editor@vinacoteca.demo / Demo1234!');
  console.log('- usuari@vinacoteca.demo / Demo1234!');

  process.exit(0);
}

main().catch((error) => {
  console.error('Error en seed:', error);
  process.exit(1);
});
