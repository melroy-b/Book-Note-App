import axios from "axios";
import db from "../db/index.js";

// Open Library API base URL
const openLibraryUrl = "http://openlibrary.org/search.json";

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
    const result = await axios.get(openLibraryUrl, {
      params: { q: query, fields: "cover_i,title,author_name,author_key", limit: 10 },
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching data from Open Library API:", error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
};
