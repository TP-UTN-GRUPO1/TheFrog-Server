// aca vendriamos a poner todo lo que son las relaciones de las tablas si es 1 n || n n
import {Role} from "./Roles.js";
import {User} from "./Users.js";
import {Game} from "./Games.js";
import {Genre} from "./Genre.js";
import {Platform} from "./Platform.js";     



Role.hasMany(User);      // un rol puede tener muchos usuarios
User.belongsTo(Role);    // un usuario tiene un solo rol

Game.belongsToMany(Genre, {through: "game_genre", foreignKey:""}); // un juego puede tener muchos generos y un genero puede tener muchos juegos
Genre.belongsToMany(Game, {through: "game_genre", foreignKey:""}); // un genero puede tener muchos juegos y un juego puede tener muchos generos

Game.belongsToMany(Platform, {through: "game_platform", foreignKey:"gameId"}); // un juego puede tener muchas plataformas y una plataforma puede tener muchos juegos
Platform.belongsToMany(Game, {through: "game_platform", foreignKey:"platformId"}); // una plataforma puede tener muchos juegos y un juego puede tener muchas plataformas

