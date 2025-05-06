import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token)
        return res.status(401).send({ message: "No tiene autorizacion" });

    try {
        const payload = jwt.verify(token, "theFrogGames");
        console.log(payload)
        next();
    } catch (error) {
        return res.status(401).send({ message: "No tiene los permisos necesarios" })
    }

}