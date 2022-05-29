import joi from "joi";
import connection from "../database.js";

const categoriesSchema = joi.object({
    name: joi.string().required()
});

export async function categoriesValidation(req, res, next){
    const validation = categoriesSchema.validate(req.body)
    if(validation.error){
        return res.sendStatus(400);
    }
    try{
        const result = await connection.query(`
        SELECT *
        FROM categories
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