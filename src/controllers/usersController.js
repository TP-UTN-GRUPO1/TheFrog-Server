import { User } from "../models/Users.js";
import { Role } from "../models/Roles.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { roles } from "../utils/genrePlatform.js";

export const createNewUser = async (req, res) => {
  const { name, email, date, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).send({ message: "El email ya está registrado" });
  }

  // Hash password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    date,
    password: hashedPassword,
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

  return res.json(token);
};

export const uploadRolesInDb = async ()=> {
  try {
   
    for (const roleName of roles.rolesName) {
      await Role.findOrCreate({
        where: { roleName: roleName.trim() }
      });
    }
    console.log("Datos cargados exitosamente GG");
    return true;
    
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
    throw error; 
  }
}
/*Hacer funciones que pueda editar , obeter, borrar usuarios */