# 🛍️ Documentación del Sitio Web - The Frog Games

## 📌 Descripción General

Este proyecto es un sitio web de e-commerce para la venta de productos digitales, como juegos de PS4, PS5 y Xbox. El sitio permite a los usuarios navegar por el catálogo, gestionar un carrito de compras, realizar pedidos y que los administradores gestionen productos y ventas.

---

## ⚙️ Funcionalidades

### 👤 Usuario (Cliente)
- Registro e inicio de sesión (Auth0).
- Navegación por catálogo de productos.
- Filtros por plataforma/categoría.
- Vista detallada del producto.
- Agregar y quitar productos del carrito.
- Finalizar compra (MercadoPago).
- Ver historial de pedidos.

### 🧑‍💼 Usuario Administrador
- Panel de administración.
- Crear, editar y eliminar productos.
- Ver lista de pedidos y usuarios.
- Subida de imágenes de productos (Cloudinary, opcional).
- Visualización de estadísticas de ventas.

---

## 🧱 Tecnologías Utilizadas

- **Backend**: Node.js + Express  
- **Base de datos**: SQLite  
- **Frontend**: React  
- **Estilos**: A elección (ej. TailwindCSS, Bootstrap o Material UI)  
- **Autenticación**: Auth0  
- **Pasarela de pagos**: API de MercadoPago  
- **Gestión de imágenes**: Cloudinary (opcional)

---

## 🗃️ Modelo de Datos (Entidades Principales)

### 👤 Usuario
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_usuario | INTEGER (PK) | Identificador único |
| nombre | TEXT | Nombre del usuario |
| email | TEXT | Correo electrónico |
| contraseña | TEXT | Hasheada (si no se usa Auth0 directamente) |
| rol | TEXT | 'cliente' o 'admin' |

---

### 🎮 Producto
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_producto | INTEGER (PK) | Identificador único |
| nombre | TEXT | Nombre del producto |
| descripcion | TEXT | Descripción detallada |
| precio | REAL | Precio |
| plataforma | TEXT | PS4, PS5, Xbox |
| stock | INTEGER | Cantidad disponible |
| imagen_url | TEXT | URL de la imagen (opcional con Cloudinary) |

---

### 🛒 Detalle_Carrito
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_usuario | INTEGER (FK) | Usuario dueño del carrito |
| id_producto | INTEGER (FK) | Producto agregado |
| cantidad | INTEGER | Cantidad agregada |

> 🔁 Esta entidad representa el carrito actual de cada usuario. Se pueden hacer consultas para saber qué productos tiene cada usuario en su carrito y cuántos.



## 📷 Cloudinary (opcional)

Cloudinary se puede usar para subir imágenes desde el panel de administrador, guardando solo la URL en la base de datos. Esto permite un manejo más dinámico de medios y optimización automática.

---

## 💳 Integración con MercadoPago

Se utilizará la API de MercadoPago para generar pagos, manejar notificaciones de estados de pago y validar transacciones exitosas o fallidas.

---

## 🔐 Auth0

Auth0 se encargará del sistema de autenticación y autorización, gestionando usuarios, roles y tokens de acceso de forma segura.

---

## 🗂️ Estructura General

```bash
/cliente     # Frontend en React
/backend     # Backend con Express
  ├── controllers/
  ├── routes/
  ├── models/
  └── database.sqlite
