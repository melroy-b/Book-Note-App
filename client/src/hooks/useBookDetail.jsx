import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Loads detailed Open Library data for a selected book, author, and edition.
 */
const useBookDetail = (bookId, authorId, editionId) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    // Fetch the server-merged book summary and ignore aborted requests.
    const searchBookSummary = async () => {
      if (!bookId) return;

      try {
        const bookResponse = await fetch(
          `${API_URL}/api/books/book/${bookId}?author=${authorId}&edition=${editionId}`,
          {
            signal: controller.signal,
          },
        );
        const data = await bookResponse.json();

        console.log("Fetched book details:", data);
        setResults(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search for book summary failed: ", error);
        }
      }
    };

    searchBookSummary();

    return () => controller.abort();
  }, [bookId, authorId]);

  return results;
};

export default useBookDetail;
