import { Genre } from "../models/Genre.js";
import { Platform } from "../models/Platform.js";
import { data } from "../utils/genrePlatform.js";

export const loadGenresAndPlatform = async () => {
  try {
    // aca cargamos los genres 
    for (const genreName of data.genres) {
      await Genre.findOrCreate({
        where: { genreName: genreName.trim() }
      });
    }

    // aca cargamos las platforms
    for (const platformName of data.platforms) {
      await Platform.findOrCreate({
        where: { platformName: platformName.trim() }
      });
    }

    console.log("Datos cargados exitosamente GG");
    return true;
    
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
    throw error; 
  }
};

export const getPlatformsAndGenres = async (req, res) => {
    try {
      const [genres, platforms] = await Promise.all([
        Genre.findAll(),
        Platform.findAll()
      ]);
  
      res.status(200).json({
        success: true,
        genres,
        platforms
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener generos y plataformas",
        error: error.message
      });
    }
  };
