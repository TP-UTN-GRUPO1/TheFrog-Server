import { Game } from "../models/Games.js";
import { Genre } from "../models/Genre.js";
import { Platform } from "../models/Platform.js";


/* export const createGames = async (req, res) => {
    const { nameGame, platform, genre, price, imageUrl, developer, rating } = req.body;

    if (!nameGame || !developer || !price || !imageUrl || rating === undefined) {
        return res.status(400).json({ message: "Nombre, desarrolladora, precio, imagen y rating son campos requeridos" });
    }
    if (!Number.isInteger(rating) || rating < 0 || rating > 10) {
        return res.status(400).json({ message: "El rating debe ser un entero entre 0 y 10" });
    }
    if (!genre || !Array.isArray(genre) || genre.length === 0) {
        return res.status(400).json({ message: "Se requiere al menos un género válido" });
    }
    if (!platform || !Array.isArray(platform) || platform.length === 0) {
        return res.status(400).json({ message: "Se requiere al menos una plataforma válida" });
    }
    try {
        
        const validGenres = await Genre.findAll({
            where: { genreName: genre }
        });
        if (validGenres.length !== genre.length) {
            const invalidGenres = genre.filter(g => !validGenres.some(vg => vg.genreName === g));
            return res.status(400).json({ message: `Géneros inválidos: ${invalidGenres.join(", ")}` });
        }

        
        const validPlatforms = await Platform.findAll({
            where: { platformName: platform }
        });
        if (validPlatforms.length !== platform.length) {
            const invalidPlatforms = platform.filter(p => !validPlatforms.some(vp => vp.platformName === p));
            return res.status(400).json({ message: `Plataformas inválidas: ${invalidPlatforms.join(", ")}` });
        }

        // Crear el nuevo juego
        const newGame = await Game.create({
            nameGame,
            price,
            imageUrl,
            developer,
            rating,
            available: true
        });

     
        await newGame.setGenres(validGenres);
        await newGame.setPlatforms(validPlatforms);

      

        
        const gameWithAssociations = await Game.findByPk(newGame.id, {
            include: [
                { model: Genre, through: { attributes: [] } },
                { model: Platform, through: { attributes: [] } }
            ]
        });

        return res.status(201).json({
            message: "Juego creado exitosamente",
            game: gameWithAssociations
        });
    } catch (error) {
        console.error("Error al crear el juego:", error);
        return res.status(500).json({ message: "Error al crear el juego", error: error.message });
    }
}; */
const img =
  "https://imgs.search.brave.com/qa3D7S-V1de1p9GPk4pmfcCVhAIcntcn2gzOYIP6Cfg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5mdGNkbi5uZXQvanBnLzExLzIwLzQxLzU2LzM2MF9GXzExMjA0MTU2NjVfV0hrcXNwVW90NmJiUlRzTGZVRnBKcnhuMXFldFZaVYkuanBn";

export const createGames = async (req, res) => {
  const { nameGame, platforms, genres, price, imageUrl, developer, rating } = req.body;

  // Validar campos requeridos
  if (!nameGame || !price || !developer || !rating || !genres || !platforms) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  // Validar que platforms y genres sean arrays
  if (!Array.isArray(platforms) || !Array.isArray(genres)) {
    return res.status(400).json({ message: "Plataformas y géneros deben ser arrays" });
  }

  try {
    // Crear el juego
    const newGame = await Game.create({
      nameGame,
      price,
      imageUrl: imageUrl || img,
      developer,
      rating,
      available: true,
    });

    // Buscar plataformas
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

    // Buscar géneros
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

    // Asociar plataformas y géneros
    await newGame.setPlatforms(platformsDb);
    await newGame.setGenres(genresDb);

    // Devolver el juego con sus asociaciones
    const gameWithDetails = await Game.findByPk(newGame.id, {
      include: [
        { model: Platform, attributes: ["platformName"] },
        { model: Genre, attributes: ["genreName"] },
      ],
    });

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
                { model: Platform, as: "platforms" },
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
    const game = await Game.findOne({where:{id}})

    if(!game)
        res.status(400).send({message: "Game not found"})

    res.send(game)
}