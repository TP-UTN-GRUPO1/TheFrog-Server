import { Game } from "../models/Games.js";
import { User } from "../models/Users.js";

export const addFavorites = async (req, res) => {

    const { gameId, idUser } = req.body


    try {
        if (!gameId || !idUser) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        const user = await User.findByPk(idUser);
        const game = await Game.findByPk(gameId);

        if (!game || !user) {
            return res.status(404).json({ message: "Juego o usuario no encontrado" });
        }

        const alreadyFavorite = await user.hasGame(game);

        if (alreadyFavorite) {
            return res.status(400).json({ message: "El juego ya está en favoritos" });
        }

        await user.addGame(game);

        return res.status(201).json({ message: "Juego agregado a favoritos" });


    } catch (error) {
        return res.status(500).json({ message: "Error de servidor" })
    }



}

export const deleteFavorites = async (req, res) => {

    const { gameId, idUser } = req.body


    try {
        if (!gameId || !idUser) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        const user = await User.findByPk(idUser);
        const game = await Game.findByPk(gameId);

        if (!game || !user) {
            return res.status(404).json({ message: "Juego o usuario no encontrado" });
        }

        await user.removeGame(game)

        return res.status(201).json({ message: "Juego eliminado de favoritos" });

    } catch (error) {
        return res.status(500).json({ message: "Error de servidor" })
    }



}


export const getAllFavorites = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
      include: {
        model: Game,
        through: { attributes: [] },
        attributes: ["id", "nameGame", "price", "imageUrl", "available"]
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};


export const getFavoritesByUser = async (req, res) => {

    const {id} = req.params

  try {
    const users = await User.findOne({where:{id},
      attributes: ["id", "name", "email"],
      include: {
        model: Game,
        through: { attributes: [] },
        attributes: ["id", "nameGame", "price", "imageUrl", "available"]
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};