import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
import { Role } from "../models/Roles.js";

export const authenticate = async (req, res, next) => {
 
  try {
    const decoded = jwt.verify(token, "theFrogGames");

    const user = await User.findByPk(decoded.id, {
      include: { model: Role }, 
    });

    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido", error: err });
  }
};
 