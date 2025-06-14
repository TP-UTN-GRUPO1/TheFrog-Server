import { sequelize } from "../db.js";
import { OrderItem } from "../models/OrderItem.js";
import { Order } from "../models/Order.js";
import { Game } from "../models/Games.js";
import { User } from "../models/Users.js";

export const createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  try {
    const order = await sequelize.transaction(async (t) => {
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) throw new Error("Usuario no encontrado");

      const newOrder = await Order.create(
        {
          userId,
          totalAmount,
          orderItems: items.map((i) => ({
            gameId: i.gameId,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        },
        {
          include: [OrderItem],
          transaction: t,
        }
      );

      await Promise.all(
        items.map(async (item) => {
          const game = await Game.findOne({
            where: { id: item.gameId },
            lock: t.LOCK.UPDATE,
            transaction: t,
          });
          if (!game || !game.available)
            throw new Error(`Juego no disponible (ID: ${item.gameId})`);
          await game.increment("sold", { by: item.quantity, transaction: t });
        })
      );

      return newOrder;
    });

    return res
      .status(201)
      .json({ message: "Orden creada con éxito", orderId: order.orderId });
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

// routes/orders.js (por ejemplo)

export const historialUserBuy = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [Game],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Server error" });
  }
};
