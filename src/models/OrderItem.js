import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Order } from "./Order.js";
import { Game } from "./Games.js";

export const OrderItem = sequelize.define("orderItem", {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Order, key: "orderId" },
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Game, key: "id" },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
