import express from "express";
import {
  getBooks,
  searchBooks,
  getBookDetails,
} from "../controllers/bookController.js";

const router = express.Router();

// GET /api/books/search - Search books in DB or external API
router.get("/search", searchBooks);

// GET /api/books/book/:bookId - Get details of a specific book
router.get("/book/:bookId", getBookDetails);

export default router;