// aca vendriamos a poner todo lo que son las relaciones de las tablas si es 1 n || n n
import { Role } from "./Roles.js";
import { User } from "./Users.js";
import { Game } from "./Games.js";
import { Genre } from "./Genre.js";
import { Platform } from "./Platform.js";
import { OrderItem } from "./OrderItem.js";
import { Order } from "./Order.js";

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

Game.belongsToMany(Genre, {
  through: "game_genre",
  foreignKey: "gameId",
  otherKey: "genreId",
  onDelete: "CASCADE",
});
Genre.belongsToMany(Game, {
  through: "game_genre",
  foreignKey: "genreId",
  otherKey: "gameId",
  onDelete: "CASCADE",
});

Game.belongsToMany(Platform, {
  through: "game_platform",
  foreignKey: "gameId",
  otherKey: "platformId",
  onDelete: "CASCADE",
});
Platform.belongsToMany(Game, {
  through: "game_platform",
  foreignKey: "platformId",
  otherKey: "gameId",
  onDelete: "CASCADE",
});

User.belongsToMany(Game, {
  through: "favorites",
  foreignKey: "idUser",
  otherKey: "gameId",
  onDelete: "CASCADE",
});
Game.belongsToMany(User, {
  through: "favorites",
  foreignKey: "gameId",
  otherKey: "idUser",
  onDelete: "CASCADE",
});

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Game.hasMany(OrderItem, { foreignKey: "gameId" });
OrderItem.belongsTo(Game, { foreignKey: "gameId" });
