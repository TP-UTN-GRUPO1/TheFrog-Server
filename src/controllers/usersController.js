import { User } from "../models/Users.js";

export const createNewUser = async (req, res) => {
    const { dni, name, lastName, email, password } = req.body;

    if (!email || !dni || !name || !lastName || !password) {
        return res.status(400).send({ message: "Ingrese todos los datos requeridos" });
    }

    try {
        const newUser = await User.create({
            dni,
            name,
            lastName,
            email,
            password,
        });
        
        console.log("Usuario creado con exito");
        return res.status(200).send({ message: "Usuario creado con exito", user: newUser });

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).send({ message: "No se pudo crear el usuario", error: error.message });
    }
};