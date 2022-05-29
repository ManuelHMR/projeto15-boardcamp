import connection from "../database.js";

export async function getCustomers(req, res){
    const { cpf } = req.query;
    if(!cpf){
        try {
            const result =  await connection.query(`
                SELECT *
                FROM customers;`
            )
            return res.send(result.rows);
        } catch (err){
            return res.send(err);
        }
    }
    try{
        const result =  await connection.query(`
                SELECT *
                FROM customers
                WHERE cpf
                LIKE $1;`, [`${cpf}%`]
            )
            res.send(result.rows);
    }catch (err){
        res.send(err);
    }    
};

export async function getCustomersById (req,res){
    const { id } = req.params;
    try {
        const result =  await connection.query(`
            SELECT *
            FROM customers
            WHERE id=$1;`, [id]
        )
        const { rows } = result;
        if(rows.length === 0){
            res.sendStatus(404)
        }
        return res.send(result.rows[0]);
    } catch (err){
        return res.send(err);
    }
};

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
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try {
        const result = await connection.query(`
        UPDATE customers 
        SET (name, phone, cpf, birthday) = ( $1, $2, $3, $4) 
        WHERE id = $5;`,
            [
                name,
                phone,
                cpf,
                birthday,
                id
            ]
        );
        return res.sendStatus(201);
    } catch (err){
        res.send(err);
    }
};