import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useBookDetail = (bookId, authorId) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const searchBookSummary = async () => {
      console.log("BookDetail page accessed: ", id);
      if (!bookId) return;
      console.log("BookDetail page accessed after ID: ", id);

      try {
        const bookResponse = await fetch(
          `${API_URL}/api/books/book/${bookId}/a/${authorId}`,
          {
            signal: controller.signal,
          }
        );
        const data = await bookResponse.json();

        // const authorResponse = await fetch(
        //   `${API_URL}/api/books/author/${authorId}`,
        //   {
        //     signal: controller.signal,
        //   }
        // );

        console.log(data);
        setResults(data);
      } catch (error) {
        if (error.name != "AbortError") {
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
