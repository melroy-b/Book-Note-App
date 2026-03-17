import axios from "axios";
import db from "../db/index.js";

// Open Library API base URL
const openLibraryUrl = "http://openlibrary.org/";

// Get books from database for a user
export const getBooks = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ error: "User ID is required / Need Log In first" });
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
        fields: "key,cover_i,title,author_name,author_key,cover_edition_key",
        limit: 20,
      },
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Error fetching data from Open Library API:", error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
};

// Get book details from external API (Open Library) with book ID, author ID, and edition ID
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
    // This endpoint return the book details, author details, edition details, and language details in a single response

    //book Details like
    const bookResult = await axios.get(`${openLibraryUrl}works/${bookId}.json`);
    //author details like name, birth date, death date, etc.
    const authorResult = await axios.get(
      `${openLibraryUrl}authors/${authorId}.json`
    );

    //This endpoint will only run if editionId and bookResult.data?.languages?.length > 0 are present, otherwise it will return an empty object.
    //This is because the edition details are only relevant if there are publishing details available for the book and if yes, languages data present?. 
    //If there is no data, then there is no need to fetch the edition details, which can save time and resources.

    //edition details like publish date, publisher, number of pages, etc.
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
    console.error("Error fetching book details:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch book details from external API" });
  }
};
