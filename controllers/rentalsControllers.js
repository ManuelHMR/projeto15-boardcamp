import connection from "../database.js";
import dayjs from "dayjs";

export async function getRentals(req, res){
    const {customerId, gameId} = req.query;
    let sql = ` 
        SELECT 
            rentals.*, 
            customers.name AS "customerName", 
            games.name AS "gameName", 
            categories.id AS "categoryId", 
            categories.name AS "categoryName" 
        FROM rentals 
        JOIN customers 
            ON customers.id = rentals."customerId" 
        JOIN games 
            ON games.id = rentals."gameId" 
        JOIN categories ON games."categoryId" = categories.id`;
    if (customerId) {
        sql += ` WHERE "customerId" = ` + customerId;
    }
    if (gameId) {
        sql += ` WHERE "gameId" = ` + gameId;
    }
    try{
        const result = await connection.query(sql);
        const response = result.rows.map(rental => {
            rental = {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                }
            }
            delete rental.customerName;
            delete rental.gameName;
            delete rental.categoryId;
            delete rental.categoryName;
            return rental
        })
        res.send(response)
    } catch(err) {
        return res.send(err)
    }
};

export async function postRentals(req, res){
    const rentDate = dayjs(Date.now()).format('YYYY-MM-DD')
    const {customerId, gameId, daysRented} = req.body;
    const game = await connection.query(`
        SELECT * FROM games
        WHERE id=$1
    `, [gameId])
    const originalPrice = game.rows[0].pricePerDay * daysRented;
    await connection.query(`
        INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
    res.sendStatus(201);
};

export async function returnRentals(req, res){
    const {id} = req.params;
    try {
        const returnDate = dayjs(Date.now()).format('YYYY-MM-DD');
        await connection.query(`UPDATE rentals SET "returnDate" = $1 WHERE id = $2`, [returnDate, id]);
        const delay = await connection.query(`SELECT * FROM rentals WHERE id = $1 AND "returnDate" - "rentDate" > "daysRented"`,[id]);
        if (delay.rows.length > 0) {
            const pricePerDay = delay.rows[0].originalPrice / delay.rows[0].daysRented;
            const delayDays = (delay.rows[0].returnDate - delay.rows[0].rentDate) / 86400000;
            const delayFee = pricePerDay * delayDays;
        
            await connection.query(`UPDATE rentals SET "delayFee" = $1 WHERE id = $2`, [delayFee, id]);
            return res.sendStatus(200);
        }
        
        await connection.query(`UPDATE rentals SET "delayFee" = 0 WHERE id = ${id}`);
        res.sendStatus(200);
    } catch (e) {
        return res.send(e);
    }
};

export async function deleteRentals(req, res){
    const id = req.params.id;
    try {
        const rentalDelete = await db.query(`
            DELETE 
            FROM rentals 
            WHERE rentals.id = $1`,
            [id]
        );
        return res.sendStatus(200);
    } catch (e) {
        return res.send(e);
    }
};