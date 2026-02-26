import axios from "axios";
import db from "../db/index.js";

// Open Library API base URL
const openLibraryUrl = "http://openlibrary.org/";

// Get books from database for a user
export const getBooks = async (req, res) => {
  const userId = req.params.id;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }
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
  const query = req.query.q?.trim();
  console.log("Search query:", query);

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const result = await axios.get(`${openLibraryUrl}search.json`, {
      params: {
        q: query,
        fields: "key,cover_i,title,author_name",
        limit: 10,
      },
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching data from Open Library API:", error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
};

// Get book details from external API (Open Library) with book ID
export const getBookDetails = async (req, res) => {
  const bookId = req.params.id;
  if (!bookId) {
    return res.status(400).json({ error: "Book ID is required" });
  }

  try {
    const result = await axios.get(
      `${openLibraryUrl}works/${bookId}.json`
    );
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching book details:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch book details from external API" });
  }
};
