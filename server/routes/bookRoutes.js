import express from "express";
import {
  getUserBooks,
  searchBooks,
  getBookDetails,
} from "../controllers/fetchBookController.js";
import { postUserNotes } from "../controllers/postUserNotesController.js";
import getQuotes from "../controllers/getQuotesGenAI.js";

const router = express.Router();

// GET /api/books/search - search books through the Open Library API.
router.get("/search", searchBooks);
// GET /api/books/book/:bookId - get Open Library work, author, and edition details.
router.get("/book/:bookId", getBookDetails);
// GET /api/books/:userId/fetch_books - get books saved by a specific user.
router.get("/:userId/fetch_books", getUserBooks);

// POST /api/books/notes - save a user's note for a book.
router.post("/notes", postUserNotes);

//GET /api/books/quotes - get a quote about books or reading.
router.get("/quotes", getQuotes);
  // For now, return a static quote. In the future, this could be dynamic.

export default router;
