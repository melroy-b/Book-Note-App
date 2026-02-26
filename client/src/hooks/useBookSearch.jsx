import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

const useBookSearch = (debouncedText) => {
  const controller = new AbortController();
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runSearch = async () => {
      if (!debouncedText) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/api/books/search?q=${encodeURIComponent(debouncedText)}`,
          {
            signal: controller.signal,
          },
        );
        const data = await response.json();
        const docs = Array.isArray(data?.docs) ? data.docs : [];
        setResults(docs);
        setShowDropdown(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search failed:", error);
          setResults([]);
          setShowDropdown(false);
        }
      } finally {
        setLoading(false);
      }
    };

    runSearch();

    return () => controller.abort();
  }, [debouncedText]);

  return [results, loading, showDropdown, setShowDropdown];
};

export default useBookSearch;
