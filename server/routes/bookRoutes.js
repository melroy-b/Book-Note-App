import express from "express";
import {
  getBooks,
  searchBooks,
  getBookDetails,
} from "../controllers/bookController.js";

const router = express.Router();

//GET /api/books/search - Get all books (search for book in DB or external API)
router.get("/search", searchBooks);
//GET /api/books/user/:id - Get all book notes for a user
router.get("/book/:id", getBookDetails);

export default router;
