import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Loads one AI-generated quote from the app API.
 */
const useGetQuotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/books/quotes`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "QUOTE_ERROR");
        }

        setQuote(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Quote fetch failed:", error);
          setError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchQuote();

    return () => controller.abort();
  }, []);

  return { quote, loading, error };
};

export default useGetQuotes;
