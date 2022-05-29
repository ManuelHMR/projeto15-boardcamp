import joi from "joi";
import connection from "../database.js";

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required().uri(),
    stockTotal: joi.number().integer().required().min(1),
    categoryId: joi.number().integer().required().min(1),
    pricePerDay: joi.number().integer().required().min(1)
});

export async function gamesValidation(req, res, next){
    const validation = gamesSchema.validate(req.body)
    if(validation.error){
        console.log(validation.error)
        return res.sendStatus(400);
    }
    try{
        const result = await connection.query(`
        SELECT *
        FROM games
        WHERE name= $1;`, [req.body.name]);
        const {rows} = result;
        if(rows.length > 0){
            return res.sendStatus(409);
        }
    } catch(err){
        res.send(err);
    }
    next();
};