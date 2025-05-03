// aca vendriamos a poner todo lo que son las relaciones de las tablas si es 1 n || n n
import {Role} from "./Roles.js"
import {User} from "./Users.js"


Role.hasMany(User);      // un rol puede tener muchos usuarios
User.belongsTo(Role);    // un usuario tiene un solo rol
