import axios from "axios";
import db from "../db/index.js";

// Open Library API base URL.
const openLibraryUrl = "http://openlibrary.org/";

/**
 * Fetches all saved book notes for a single user from the database.
 */
export const getUserBooks = async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (!userId) {
    console.error("User ID is required / Need Log In first");
    return res
      .status(400)
      .json({ error: "User ID is required / Need Log In first" });
  }
  try {
    const books = await db.query(
      "SELECT * FROM notes JOIN books ON books.id = book_id WHERE user_id = $1",
      [userId]
    );

    res.json({ error: null, data: books.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", data: [] });
  }
};

/**
 * Searches Open Library for books matching the query string.
 */
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
        fields: "key,cover_i,title,author_name,author_key,cover_edition_key",
        limit: 20,
      },
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching data from Open Library API:", error.message);
    res.status(500).json({ error: "External API error: " + error.message });
  }
};

/**
 * Fetches book, author, edition, and language details from Open Library.
 */
export const getBookDetails = async (req, res) => {
  const bookId = req.params.bookId;
  const editionId = req.query.edition?.trim();
  const authorId = req.query.author?.trim();
  if (!bookId && !authorId) {
    return res
      .status(400)
      .json({ error: "Book ID and Author ID are required" });
  }

  try {
    // Book details such as description, subjects, covers, and revision.
    const bookResult = await axios.get(`${openLibraryUrl}works/${bookId}.json`);
    // Author details such as name, birth date, death date, and bio.
    const authorResult = await axios.get(
      `${openLibraryUrl}authors/${authorId}.json`
    );

    // Edition and language details are optional because not every result has them.
    let bookPublishResult = {};
    let languageResult = {};
    if (editionId) {
      bookPublishResult = await axios.get(
        `${openLibraryUrl}books/${editionId}.json`
      );
      //language details
      if (bookPublishResult.data?.languages?.length > 0) {
        languageResult = await axios.get(
          `${openLibraryUrl}${encodeURIComponent(
            bookPublishResult.data.languages[0].key
          )}.json`
        );
      }
    }

    const bookData = {
      ...bookResult.data,
      author: authorResult?.data,
      edition: bookPublishResult?.data,
      languages: languageResult?.data,
    };
    res.status(200).json(bookData);
  } catch (error) {
    console.error("Error fetching book details:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch book details from external API" });
  }
};
