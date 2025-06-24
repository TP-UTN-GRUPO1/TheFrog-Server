
# 🐸 The Frog Games - Backend

Backend desarrollado para una tienda digital de videojuegos que permite a usuarios explorar, comprar y gestionar productos, y a administradores controlar ventas y catálogos. El sistema incluye autenticación con JWT, pagos con MercadoPago y persistencia con SQLite mediante Sequelize.

---

## ⚙️ Funcionalidades Principales

### 👥 Usuarios
- Registro e inicio de sesión con JWT.
- Roles de acceso: `user` , `admin` y `sysadmin`.
- CRUD de usuarios (Admin).
- Protección de rutas mediante middleware JWT.

### 🎮 Juegos
- Crear, editar, eliminar y listar juegos.
- Asociar juegos con plataformas y géneros.
- Filtrar por nombre o género.

### 🛒 Compras
- Crear órdenes de compra.
- Listar historial de compras por usuario.


### 📊 Administración
- CRUD de juegos, usuarios y plataformas.
- Visualización de compras.
- Panel de administración .

---

## 🧱 Tecnologías Utilizadas

| Categoría         | Herramientas                           |
|-------------------|----------------------------------------|
| Lenguaje          | JavaScript (ESModules)                 |
| Servidor          | Node.js + Express                      |
| Base de datos     | SQLite + Sequelize ORM                 |
| Autenticación     | JWT + Bcrypt                           |
| Logging           | Morgan                                 |
| Variables Entorno | Dotenv                                 |
| Testing & Dev     | Nodemon (dev)                          |

---

## 📁 Estructura de Proyecto

```
/TheFrog-Server
├── src/
│   ├── controllers/     # Lógica de negocio
│   ├── middlewares/     # JWT, errores, etc.
│   ├── models/          # Definición de tablas y relaciones
│   ├── routes/          # Endpoints agrupados por recurso
│   ├── utils/           # Funciones auxiliares
│   └── db.js            # Configuracion Sqlite3
│   └── server.js        # Punto de entrada principal
│   └── config.js        # Configuracion puerto localhost
├── videogames.db        # Base de datos SQLite
├── package.json         # Dependencias y scripts
```

---

## 🛠️ Instalación y Ejecución

1. **Clonar el repositorio**
```bash
git clone https://github.com/TP-UTN-GRUPO1/TheFrog-Server.git
cd TheFrog-Server
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor**
```bash
npm run dev     # Con recarga automática (nodemon)
```

---

## 📄 Endpoints Destacados

### Auth
- `POST /register` – Registro de usuario
- `POST /login` – Login y generación de token

### Juegos
- `GET /games` – Lista de juegos
- `POST /games` – Crear nuevo juego (Admin o Sysadmin, requiere token)
- `GET /games/:id` – Detalle de juego

### Usuarios
- `GET /users` – Listado de usuarios (Admin, requiere token)
- `DELETE /user/:id` – Eliminar usuario (Admin, requiere token)

### Órdenes
- `POST /orders` – Crear compra
- `GET /orders/user/:userId` – Órdenes de un usuario

### Plataformas
- `GET /platforms` – Lista de plataformas
- `POST /platforms` – Crear nueva plataforma

### Favoritos
- `POST /favorites` – Añadir juego a favoritos
- `GET /favorites/:id` – Obtener favoritos de un usuario

---

## 🔒 Autenticación con JWT

- Los usuarios reciben un token al iniciar sesión.
- Este token debe ser enviado en el header:  
  `Authorization: Bearer <token>`
- Las rutas protegidas están filtradas por el middleware `verifyToken`.

---


