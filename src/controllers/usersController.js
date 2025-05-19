import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword} from "../utils/validations.js";


export const createNewUser = async (req, res) => {
    console.log("Cuerpo recibido:", req.body);console.log("Cuerpo recibido:", req.body);
    const { name, email, date, password} = req.body;

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
    if (!validateLoginUser(req.body))
        return res.status(400).send({ message: "Hubo un error en la solicitud" });

    const { email, password} = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user)
        return res.status(401).send({message: "Usuario no existente"});

    const comparison = await bcrypt.compare (password, user.password);

    if(!comparison)
        return res.status(401).send({ message: "Email y/o contraseña incorrecta"});

    //Generate token

    const secretKey = "theFrogGames"; 
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.json(token)
}


const validateLoginUser = ({ email, password }) => {
    if (!validateEmail(email))
        return false;
    else if (!validatePassword(password, 6, 20, true, true))
        return false;

    return true;
}