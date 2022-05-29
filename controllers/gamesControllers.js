import connection from "../database.js";

export async function getGames(req, res){
    try {
        const result =  await connection.query(`
            SELECT *
            FROM games;`
        )
        res.send(result.rows);
    } catch (err){
        res.send(err);
    }
};

export async function postGames(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try{
        const result =  await connection.query(`
            INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay]
        )
        res.sendStatus(201);
    } catch (err) {
        res.send(err);
    }
};