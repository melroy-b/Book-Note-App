import express from "express";
import {
  getUserBooks,
  searchBooks,
  getBookDetails,
} from "../controllers/fetchBookController.js";
import { postUserNotes } from "../controllers/postUserNotesController.js";

const router = express.Router();

//GET /api/books/search - Get all books (search for book in DB or external API)
router.get("/search", searchBooks);
//GET /api/books/book/:bookId - Get book details using the book ID
router.get("/book/:bookId", getBookDetails);
//GET /api/books/:userId/fetch_books - Get saved books of user
router.get("/:userId/fetch_books", getUserBooks);

//POST /api/books/notes
router.post("/notes", postUserNotes);

export default router;
