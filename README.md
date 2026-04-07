# IA3 Vinacoteca - API + Frontend React

Projecte fullstack amb backend Express + MongoDB i frontend React en serveis independents.

## Arquitectura

- Backend API: Express (port 3001 per defecte)
- Frontend: React + Vite (port 5173 per defecte)
- Comunicacio: HTTP amb CORS configurat via `FRONTEND_URL`
- Persistencia: MongoDB (Mongoose)

## Funcionalitats implementades

- Auth JWT: registre amb foto, login, perfil GET/PUT
- Rols: `usuari`, `editor`, `admin`
- Productes: CRUD de vins i cerveses (GET public, mutacions editor/admin)
- Comandes: creacio i consulta de comandes propies
- Correu: notificacio al propietari en crear comanda (SMTP)
- Arxius: pujada d'imatges amb Multer + servei estatic `/uploads`
- Admin: llistat d'usuaris i assignacio de rols
- Frontend React: cataleg, detall, login, registre, comandes, dashboard editor i admin

## Estructura

- `server.js`: arrencada backend i middleware global
- `routes/`: rutes d'API
- `controladores/`: logica de negoci
- `modelos/`: models Mongoose
- `src/middlewares/`: auth, rols i upload
- `src/services/`: servei de correu
- `frontend/`: app React separada

## Variables d'entorn

Copia `.env.example` a `.env` i configura:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USER`
- `MAIL_PASS`
- `MAIL_FROM`
- `OWNER_EMAIL`

## Instal_lacio

Backend:

```bash
npm install
```

Frontend:

```bash
npm --prefix frontend install
```

## Execucio local

Terminal 1 (backend):

```bash
npm run dev
```

Terminal 2 (frontend):

```bash
npm run dev:frontend
```

## Endpoints principals

- `POST /api/auth/registro` (multipart amb foto)
- `POST /api/auth/login`
- `GET /api/auth/perfil`
- `PUT /api/auth/perfil`
- `GET /api/vinos` i `GET /api/chelas` (public)
- `POST/PUT/DELETE /api/vinos` (editor/admin)
- `POST/PUT/DELETE /api/chelas` (editor/admin)
- `POST /api/pedidos` i `GET /api/pedidos/me` (usuari autenticat)
- `GET /api/usuarios` i `PATCH /api/usuarios/:id/rol` (admin)

## Proves manuals

Fitxer de col_leccio HTTP: `requests.http`.

Recomanacio:

1. Registrar usuari amb foto
2. Login i guardar token
3. Provar productes publics
4. Provar CRUD amb token editor/admin
5. Crear comanda amb token usuari
6. Verificar correu al propietari
7. Provar gestio de rols amb token admin

## Seguretat

- `.env` ignorat amb `.gitignore`
- `password` hashejada amb bcrypt
- CORS restringit per origen
- Validacio basica de tipus i mida d'imatge