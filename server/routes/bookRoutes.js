import express from "express";
import { getBooks, searchBooks } from "../controllers/bookController.js";

const router = express.Router();

//GET /api/books/search - Get all books (search for book in DB or external API)
router.get("/search", searchBooks);
//GET /api/books/user/:id - Get all book notes for a user
router.get("/user/:id", getBooks);

export default router;
