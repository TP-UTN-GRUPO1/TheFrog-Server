import {Game}   from "../models/Games.js";

export const createGames = async (req,res)=>{
const {nameGame,platform,genre,price,imageUrl,developer,rating} = req.body;

if(!nameGame || !developer)
    return res.status(400).send({message:"nombre y desarrolladora son campos requeridos"})

const newGame = await Game.create({
    nameGame,
    platform,
    genre,
    price,
    imageUrl,
    developer,
    rating
})
res.send(newGame, "Game created")

}

export const getGamesFromDb = async(req,res)=>{
    try {
        const games= await Game.findAll();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({message: "error games not found", error})
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