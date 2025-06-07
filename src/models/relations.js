// aca vendriamos a poner todo lo que son las relaciones de las tablas si es 1 n || n n
import { Role } from "./Roles.js";
import { User } from "./Users.js";
import { Game } from "./Games.js";
import { Genre } from "./Genre.js";
import { Platform } from "./Platform.js";
import { OrderItem } from "./OrderItem.js";
import { Order } from "../models/Order.js";

Role.hasMany(User); // un rol puede tener muchos usuarios
User.belongsTo(Role); // un usuario tiene un solo rol

Game.belongsToMany(Genre, { through: "game_genre", foreignKey: "gameId" }); // un juego puede tener muchos generos y un genero puede tener muchos juegos
Genre.belongsToMany(Game, { through: "game_genre", foreignKey: "genreId" }); // un genero puede tener muchos juegos y un juego puede tener muchos generos

Game.belongsToMany(Platform, {
  through: "game_platform",
  foreignKey: "gameId",
});
Platform.belongsToMany(Game, {
  through: "game_platform",
  foreignKey: "platformId",
});

User.belongsToMany(Game, {
  through: "favorites",
  foreignKey: "idUser",
  otherKey: "gameId",
});
Game.belongsToMany(User, {
  through: "favorites",
  foreignKey: "gameId",
  otherKey: "idUser",
});

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Game.hasMany(OrderItem, { foreignKey: "gameId" });
OrderItem.belongsTo(Game, { foreignKey: "gameId" });
