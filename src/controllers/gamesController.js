import {Game}   from "../models/Games.js";

export const createGames = async (req,res)=>{
const {nameGame,platform,genre,price,image,developer} = req.body;

if(!nameGame || !developer)
    return res.status(400).send({message:"nombre y desarrolladora son campos requeridos"})

const newGame = await Game.create({
    nameGame,
    platform,
    genre,
    price,
    image,
    developer
})
res.send(newGame)

}

export const getGamesFromDb = async(req,res)=>{
    try {
        const games= await Game.findAll();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({message: "error games not found", error})
    }
}