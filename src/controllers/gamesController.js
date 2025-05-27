import { Game } from "../models/Games.js";
import { Genre } from "../models/Genre.js";
import { Platform } from "../models/Platform.js";
import { dataGames } from "../utils/gamesData.js";
const img =
  "https://imgs.search.brave.com/qa3D7S-V1de1p9GPk4pmfcCVhAIcntcn2gzOYIP6Cfg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5mdGNkbi5uZXQvanBnLzExLzIwLzQxLzU2LzM2MF9GXzExMjA0MTU2NjVfV0hrcXNwVW90NmJiUlRzTGZVRnBKcnhuMXFldFZaVYkuanBn";

export const createGames = async (req, res) => {
  const { nameGame, platforms, genres, price, imageUrl, developer, rating } = req.body;

  if (!nameGame || !price || !developer || !rating || !genres || !platforms) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  if (!Array.isArray(platforms) || !Array.isArray(genres)) { // arrayisarray valida que sea un array
    return res.status(400).json({ message: "Plataformas y generos deben ser arrays" });
  }

  try {
  
    const newGame = await Game.create({
      nameGame,
      price,
      imageUrl: imageUrl || img,
      developer,
      rating,
      available: true,
    });

    const platformsDb = await Platform.findAll({
      where: { platformName: platforms },
    });
    if (platformsDb.length === 0) {
      return res.status(404).json({ message: "No se encontraron plataformas" });
    }
    if (platformsDb.length !== platforms.length) {
      return res.status(404).json({
        message: "Algunas plataformas no existen",
        missing: platforms.filter(
          (p) => !platformsDb.some((db) => db.platformName === p)
        ),
      });
    }

    const genresDb = await Genre.findAll({
      where: { genreName: genres },
    });
    if (genresDb.length === 0) {
      return res.status(404).json({ message: "No se encontraron géneros" });
    }
    if (genresDb.length !== genres.length) {
      return res.status(404).json({
        message: "Algunas géneros no existen",
        missing: genres.filter((g) => !genresDb.some((db) => db.genreName === g)),
      });
    }


    await newGame.setPlatforms(platformsDb);
    await newGame.setGenres(genresDb);


    const gameWithDetails = await Game.findByPk(newGame.id, {
      include: [
        {
          model: Platform,
          attributes: ["platformName"], 
          through: { attributes: [] }, 
        },
        {
          model: Genre,
          attributes: ["genreName"], 
          through: { attributes: [] }, 
        },
      ],
    });
    if (!gameWithDetails) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    res.status(201).json({ message: "Juego creado exitosamente", game: gameWithDetails });
  } catch (error) {
    console.error("Error al crear el juego:", error);
    res.status(500).json({ message: "Error al crear el juego", error: error.message });
  }
};


export const getGamesFromDb = async(req,res)=> {
    try {
        const games = await Game.findAll({
          include: [
            {
              model: Platform,
              as: "platforms",
              attributes: ["platformName"], 
              through: { attributes: [] }, 
            },
            {
              model: Genre,
              as: "genres",
              attributes: ["genreName"], 
              through: { attributes: [] }, 
            },
          ],
        });
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: "error games not found", error });
    }
}

export const deleteGame = async(req,res)=> {
    const {id} = req.params
    const game = await Game.findByPk(id)

    if (!game)
        return res.status(400).send({message: "Game not found"})

    await game.destroy();
    res.send(`game for id: ${id} was destroyed`)
}

export const findGame =async(req,res) => {
    const {id} = req.params
    const game = await Game.findOne({where:{id},   
      include: [
      {
        model: Platform,
        attributes: ["platformName"], 
        through: { attributes: [] }, 
      },
      {
        model: Genre,
        attributes: ["genreName"], 
        through: { attributes: [] }, 
      },
    ],}
    
    )

    if(!game)
        res.status(400).send({message: "Game not found"})

    res.send(game)
}
//-------------- aca cargamos los juegos que tenemos en el utils
export const addGameFromArchive = async (res) => {
  
  if (!dataGames || !Array.isArray(dataGames) || dataGames.length === 0) {
    return res.status(400).json({ message: "No se proporcionaron juegos válidos" });
  }

  try {
    
    const requiredFields = ["nameGame", "developer", "rating", "imageUrl", "price", "platform", "genre"];
    for (const game of dataGames) {
      for (const field of requiredFields) {
        if (!game[field]) {
          return res.status(400).json({ message: `Falta el campo ${field} en un juego` });
        }
      }
      if (!Array.isArray(game.platform) || !Array.isArray(game.genre)) {
        return res.status(400).json({ message: "Plataformas y géneros deben ser arrays" });
      }
    }

    
    const gamesToCreate = dataGames.map(({ platform, genre, ...rest }) => rest);
    const createdGames = await Game.bulkCreate(gamesToCreate, {
      validate: true,
    });

  
    for (const game of createdGames) {
      const gameData = dataGames.find((g) => g.nameGame === game.nameGame); 

      
      const platformsDb = await Platform.findAll({
        where: { platformName: gameData.platform },
      });
      if (platformsDb.length !== gameData.platform.length) {
        return res.status(404).json({
          message: "Algunas plataformas no existen",
          missing: gameData.platform.filter(
            (p) => !platformsDb.some((db) => db.platformName === p)
          ),
        });
      }

      
      const genresDb = await Genre.findAll({
        where: { genreName: gameData.genre },
      });
      if (genresDb.length !== gameData.genre.length) {
        return res.status(404).json({
          message: "Algunos géneros no existen",
          missing: gameData.genres.filter(
            (g) => !genresDb.some((db) => db.genreName === g)
          ),
        });
      }

      
      await game.setPlatforms(platformsDb);
      await game.setGenres(genresDb);
    }

    
    const gamesWithDetails = await Game.findAll({
      where: { id: createdGames.map((g) => g.id) },
      include: [
        {
          model: Platform,
          as: "platforms",
          attributes: ["platformName"],
          through: { attributes: [] },
        },
        {
          model: Genre,
          as: "genres",
          attributes: ["genreName"],
          through: { attributes: [] },
        },
      ],
    });

    
    const formattedGames = gamesWithDetails.map((game) => ({
      ...game.toJSON(), //trae todo lo de game y lo convierte a json
      platforms: game.platforms.map((plt) => plt.platformName),
      genres: game.genres.map((gen) => gen.genreName),
    }));

    res.status(201).json({
      message: "Juegos creados exitosamente",
      games: formattedGames,
    });
  } catch (error) {
    console.error("Error al crear los juegos:", error);
    res.status(500).json({ message: "Error al crear los juegos", error: error.message });
  }
};
export const getAllGamesOrByName = async (req, res) => {
  try {
    const { name } = req.query;

    const games = await Game.findAll({
      include: [
        {
          model: Platform,
          attributes: ["platformName"],
          through: { attributes: [] },
        },
        {
          model: Genre,
          attributes: ["genreName"],
          through: { attributes: [] },
        },
      ],
    });

    if (name) {
      const filtered = games.filter((g) =>
        g.nameGame.toLowerCase().includes(name.toLowerCase())
      );

      return filtered.length
        ? res.status(200).json(filtered)
        : res.status(404).json({ message: "Juego no encontrado" });
    }

    return res.status(200).json(games);
  } catch (error) {
    console.error("❌ Error obteniendo juegos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { nameGame, platforms, genres, price, imageUrl, developer, rating } = req.body;

  if (!nameGame || !price || !developer || !rating || !genres || !platforms) {
      return res.status(400).json({ message: "Datos incompletos" });
  }

  if (!Array.isArray(platforms) || !Array.isArray(genres)) {
      return res.status(400).json({ message: "Plataformas y géneros deben ser arrays" });
  }

  try {
      
      const game = await Game.findByPk(id);
      if (!game) {
          return res.status(404).json({ message: "Juego no encontrado" });
      }

   
      await game.update({
          nameGame,
          price,
          imageUrl: imageUrl || game.imageUrl, 
          developer,
          rating,
          available: true,
      });

      
      const platformsDb = await Platform.findAll({
          where: { platformName: platforms },
      });
      if (platformsDb.length === 0) {
          return res.status(404).json({ message: "No se encontraron plataformas" });
      }
      if (platformsDb.length !== platforms.length) {
          return res.status(404).json({
              message: "Algunas plataformas no existen",
              missing: platforms.filter(
                  (p) => !platformsDb.some((db) => db.platformName === p)
              ),
          });
      }

      
      const genresDb = await Genre.findAll({
          where: { genreName: genres },
      });
      if (genresDb.length === 0) {
          return res.status(404).json({ message: "No se encontraron géneros" });
      }
      if (genresDb.length !== genres.length) {
          return res.status(404).json({
              message: "Algunos géneros no existen",
              missing: genres.filter((g) => !genresDb.some((db) => db.genreName === g)),
          });
      }

      
      await game.setPlatforms(platformsDb);
      await game.setGenres(genresDb);

      
      const gameWithDetails = await Game.findByPk(id, {
          include: [
              {
                  model: Platform,
                  attributes: ["platformName"],
                  through: { attributes: [] },
              },
              {
                  model: Genre,
                  attributes: ["genreName"],
                  through: { attributes: [] },
              },
          ],
      });

      res.status(200).json({ message: "Juego actualizado exitosamente", game: gameWithDetails });
  } catch (error) {
      console.error("Error al actualizar el juego:", error);
      res.status(500).json({ message: "Error al actualizar el juego", error: error.message });
  }
};

