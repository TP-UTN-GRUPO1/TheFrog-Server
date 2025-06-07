import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Game } from "../models/Games.js";
import { User } from "../models/Users.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const user = await User.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const order = await Order.create({ userId, totalAmount });

    for (const item of items) {
      const game = await Game.findByPk(item.gameId);
      if (!game) continue;

      // Guardar el item
      await OrderItem.create({
        orderId: order.id,
        gameId: item.gameId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      });

      game.sold = (game.sold || 0) + item.quantity;
      await game.save();
    }

    res
      .status(201)
      .json({ message: "Orden creada con éxito", orderId: order.id });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
};
