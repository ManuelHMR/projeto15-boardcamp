import connection from "../database.js";

export async function getCategories(req, res){
    try {
        const result =  await connection.query(`
            SELECT *
            FROM categories;`
        )
        res.send(result.rows);
    } catch (err){
        res.send(err);
    }
};

export async function postCategories(req, res){
    const {name} = req.body;
    try{
        const result =  await connection.query(`
            INSERT INTO categories (name)
            VALUES ($1);`, [name]
        )
        res.send("Categoria Adicionada");
    } catch (err) {
        res.send(err);
    }
};