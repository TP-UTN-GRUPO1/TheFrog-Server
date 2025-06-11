import { User } from "../models/Users.js";
import { Role } from "../models/Roles.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { roles } from "../utils/genrePlatform.js";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Game } from "../models/Games.js";

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
    roleId: userRole.idRole, // 👈 asignación correcta
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

  //Generate token

  const secretKey = "theFrogGames";
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    secretKey,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
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

export const getUserFromDb = async (req,res) => {
      try {
          const users = await User.findAll({
            include: [
              {
                model: Role,
                attributes: ["roleName"], 
                
              }, ],
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "error users not found", error });
        }
}

export const deleteUser = async(req,res)=> {
  const {id} = req.params
  const user = await User.findByPk(id)

  if (!user)
      return res.status(400).send({message: "user not found"})

  await user.destroy();
  res.send(`user for id: ${id} was destroyed`)
}
// export const  updateUser = async (req,res)=> {
// const {email}= req.params
// const { name,lastName ,country,province, city,adress,date,email } = req.body
// }
/*Hacer funciones que pueda editar , obeter, borrar usuarios */
