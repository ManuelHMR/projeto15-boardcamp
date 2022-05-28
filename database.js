import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
    host: process.env.HOST,
    port: 5432,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
}

const connection = new Pool(databaseConfig);

export default connection;