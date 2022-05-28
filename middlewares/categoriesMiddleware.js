import joi from "joi";
import connection from "../database.js";

const categoriesSchema = joi.object({
    name: joi.string().required()
});

export async function categoriesValidation(req, res, next){
    const validation = categoriesSchema.validate(req.body)
    if(validation.error){
        return res.send("Sem dados").status(201);
    }
    try{
        const result = await connection.query(`
        SELECT *
        FROM categories
        WHERE name= $1;`, [req.body.name]);
        const {rows} = result;
        if(rows.length > 0){
            return res.send('Categoria já existente!').status(409);
        }
    } catch(err){
        res.send(err);
    }
    next();
};