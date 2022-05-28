import connection from "../database.js";

export async function getCategories(req, res){
    try {
        const result =  await connection.query(
            `SELECT *
            FROM categories`
        )
        console.log(result.rows)
    } catch (err){
        res.send(err)
    }
};

export async function postCategories(req, res){

};