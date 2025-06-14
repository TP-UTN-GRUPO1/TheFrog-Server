import jwt from 'jsonwebtoken'
import { User } from '../models/Users.js';
import { Role } from '../models/Roles.js';
export const verifyToken = async(req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    console.log(token)
    if (!token)
        return res.status(401).send({ message: "No tiene autorizacion" });

    try {
        const payload = jwt.verify(token, "theFrogGames");
        console.log(payload, "--")
        const user = await User.findByPk(payload.id, {
            include: { model: Role }, 
          });
      console.log(user, "user")
          if (!user) return res.status(401).json({ message: "Usuario no encontrado" });
      
          req.user = user; 
          next();
       
    } catch (error) {
        return res.status(401).json({ error,message: "No tiene los permisos necesarios" })
    }

}