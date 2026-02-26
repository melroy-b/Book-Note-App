import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useBookDetail = (id) => {
  const controller = new AbortController();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const searchBookSummary = async () => {
      if (!id) return;
      console.log("BookDetail page accessed: ", id);

      try {
        const response = await fetch(`${API_URL}/api/books/book/${id}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        console.log(data);
        setResults(data);
      } catch (error) {
        if (error.name != "AbortError") {
          console.error("Search for book summary failed: ", error);
        }
      }
    };

    searchBookSummary();

    return () => controller.abort;
  }, [id]);

  return results;
};

export default useBookDetail;
