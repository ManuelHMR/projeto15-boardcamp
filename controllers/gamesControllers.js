import connection from "../database.js";

export async function getGames(req, res){
    const { name } = req.query;
    if(!name){
        try {
            const result =  await connection.query(`
                SELECT *
                FROM games;`
            )
            return res.send(result.rows);
        } catch (err){
            return res.send(err);
        }
    }
    try{
        const result =  await connection.query(`
                SELECT *
                FROM games
                WHERE name
                LIKE $1;`, [`${name}%`]
            )
            res.send(result.rows);
    } catch(err){
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