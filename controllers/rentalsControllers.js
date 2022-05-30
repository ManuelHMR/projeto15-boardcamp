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
    const { id } = req.params;
    const returnDate = dayjs().format('YYYY-MM-DD');
    let delayFee = 0;

    try {
        const rentalDetails = await db.query(`
            SELECT 
                rentals.*,
                games."pricePerDay" 
            FROM rentals 
            JOIN games 
                ON rentals."gameId" = games.id 
            WHERE rentals.id = $1`,
            [id]
        );

        const rentDate = dayjs(rentalDetails.rows[0].rentDate);
        const dateDif = rentDate.diff(returnDate, 'day');

        if (dateDif > rentalDetails.rows[0].daysRented) {
            delayFee =
                (dateDif - rentalDetails.rows[0].daysRented) *
                rentalDetails.rows[0].pricePerDay;
        }

        await db.query(
            `UPDATE rentals SET ("returnDate", "delayFee") = ( $1, $2 ) WHERE id = $3;`,
            [returnDate, delayFee, id]
        );
        return res.sendStatus(200);
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