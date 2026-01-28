import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

db.on("connect", () => {
    console.log("Connected to the database");
});

db.on("error", (err) => {
    console.error("Database error:", err);  
});

export default db;
