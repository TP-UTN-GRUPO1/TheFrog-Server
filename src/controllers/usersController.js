import { User } from "../models/Users.js";
import { Role } from "../models/Roles.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { roles } from "../utils/genrePlatform.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Game } from "../models/Games.js";
import { sequelize } from "../db.js";
export const createNewUser = async (req, res) => {
  const { name, email, date, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).send({ message: "El email ya está registrado" });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userRole = await Role.findOne({ where: { roleName: "user" } });

  if (!userRole) {
    return res.status(500).send({ message: "Rol por defecto no encontrado" });
  }

  const newUser = await User.create({
    name,
    email,
    date,
    password: hashedPassword,
    roleId: userRole.idRole,
  });

  res.status(201).json({ id: newUser.id });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return res.status(401).send({ message: "Usuario no existente" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  const secretKey = "theFrogGames";
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, roleId: user.roleId },
    secretKey,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: user.roleId,
    },
  });
};

export const uploadRolesInDb = async () => {
  try {
    for (const roleName of roles.rolesName) {
      await Role.findOrCreate({
        where: { roleName: roleName.trim() },
      });
    }
    console.log("Datos cargados exitosamente GG");
    return true;
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
    throw error;
  }
};

export const purchaseHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "orderItems",
          include: [{ model: Game, as: "game" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
};

export const getUserFromDb = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error users not found", error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  try {
    
    const user = await User.findByPk(id, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    
    await sequelize.models.favorites.destroy({
      where: { idUser: id },
      transaction
    });

    
    const orders = await Order.findAll({
      where: { userId: id },
      include: [OrderItem],
      transaction
    });

    
    for (const order of orders) {
      await OrderItem.destroy({
        where: { orderId: order.orderId },
        transaction
      });
      await order.destroy({ transaction });
    }

    
    await user.destroy({ transaction });

    
    await transaction.commit();

    res.status(200).json({
      success: true,
      message: `User ${id} deleted successfully with all related data`
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { roleName } = req.body;

  try {
    const role = await Role.findOne({ where: { roleName } });
    if (!role) return res.status(404).send({ message: "Rol no válido" });

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).send({ message: "Usuario no encontrado" });

    user.roleId = role.idRole;
    await user.save();

    res.status(200).json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol", error });
  }
};

export const updateAccount = async (req, res) => {
  const { id, address, lastName, city, province, country } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.address = address;
    user.lastName = lastName;
    user.city = city;
    user.province = province;
    user.country = country;
    await user.save();

    res.status(200).json({ message: "Cuenta actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cuenta", error });
  }
};

export const getAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({
      address: user.address,
      lastName: user.lastName,
      city: user.city,
      province: user.province,
      country: user.country,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cargar cuenta" });
  }
};
