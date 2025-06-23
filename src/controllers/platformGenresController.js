import { Genre } from "../models/Genre.js";
import { Platform } from "../models/Platform.js";
import { data } from "../utils/genrePlatform.js";

export const loadGenresAndPlatform = async () => {
  try {
    // aca cargamos los genres
    for (const genreName of data.genres) {
      await Genre.findOrCreate({
        where: { genreName: genreName.trim() },
      });
    }

    // aca cargamos las platforms
    for (const platformName of data.platforms) {
      await Platform.findOrCreate({
        where: { platformName: platformName.trim() },
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
      Platform.findAll(),
    ]);

    res.status(200).json({
      success: true,
      genres,
      platforms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener generos y plataformas",
      error: error.message,
    });
  }
};

export const createPlatform = async (req, res) => {
  const { platformName } = req.body;

  if (!platformName || !platformName.trim()) {
    return res.status(400).json({
      success: false,
      message: "El nombre de la plataforma es obligatorio",
    });
  }

  try {
    const [platform, created] = await Platform.findOrCreate({
      where: { platformName: platformName.trim() },
    });

    if (!created) {
      return res
        .status(200)
        .json({ success: false, message: "La plataforma ya existe" });
    }

    res.status(201).json({ success: true, platform });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear la plataforma",
      error: error.message,
    });
  }
};

export const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.findAll();
    res.status(200).json({ success: true, platforms });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener plataformas",
      error: error.message,
    });
  }
};

export const updatePlatforms = async (req, res) => {
  const { id } = req.params;
  const { platformName } = req.body;

  try {
    const platform = await Platform.findByPk(id);
    if (!platform) {
      return res
        .status(404)
        .json({ success: false, message: "Plataforma no encontrada" });
    }

    platform.platformName = platformName.trim();
    await platform.save();

    res.status(200).json({ success: true, platform });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar",
      error: error.message,
    });
  }
};

export const deletePlatforms = async (req, res) => {
  const { id } = req.params;

  try {
    const platform = await Platform.findByPk(id);
    if (!platform) {
      return res
        .status(404)
        .json({ success: false, message: "Plataforma no encontrada" });
    }

    await platform.destroy();
    res.status(200).json({ success: true, message: "Plataforma eliminada" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar",
      error: error.message,
    });
  }
};
