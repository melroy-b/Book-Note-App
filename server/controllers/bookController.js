import axios from "axios";
import db from "../db/index.js";

// Open Library API base URL
const openLibraryUrl = "http://openlibrary.org/search.json";

// Get books from database for a user
export const getBooks = async (req, res) => {
  const userId = req.params.id;
  try {
    const books = await db.query(
      "SELECT * FROM notes JOIN books ON books.id = notes.book_id WHERE user_id = $1",
      [userId]
    );
    res.json(books.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search books from external API (Open Library) with search query
export const searchBooks = async (req, res) => {
  const query = req.body.search;
  try {
    const result = await axios.get(openLibraryUrl, { params: { q: query } });
    res.json(result.data);
  } catch (error) {
    console.error("Error fetching data from Open Library API:", error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
};


