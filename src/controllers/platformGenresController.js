import {Genre} from "../models/Genre.js"
import {Platform} from "../models/Platform.js"
import {data} from "../utils/genrePlatform.js"

export const loadGenresAndPlatform = async (req,res)=> {
    try {
        for (const genreName of data.genres){
            await Genre.findOrCreate({where :{ name:genreName}})
        }
        for (const platformName of data.platforms){
            await Platform.findOrCreate({where :{ name:platformName}})
        }
        console.log("entro la balubi")
        return res.status(200).send({message: "successfully loaded platform and genre "})
    } catch (error) {
        return res.status(500).send({message: "error loadind data",error})
    }
}
