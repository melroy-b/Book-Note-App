import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();

// Shared PostgreSQL connection pool for controllers and route handlers.
const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Log successful pool connections during development.
db.on("connect", () => {
    console.log("Connected to the database");
});

// Surface unexpected database connection errors.
db.on("error", (err) => {
    console.error("Database error:", err);  
});

export default db;
