import connection from "../database.js";

export async function getCustomers(req, res){
    try {
        const result =  await connection.query(`
            SELECT *
            FROM customers;`
        )
        return res.send(result.rows);
    } catch (err){
        return res.send(err);
    }
};

export async function getCustomersById (req,res){

}

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body;
    try{
        const result =  await connection.query(`
            INSERT INTO customers ("name", "phone", "cpf", "birthday")
            VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]
        )
        res.sendStatus(201);
    } catch (err) {
        res.send(err);
    }
};

export async function putCustomers (req, res){

}