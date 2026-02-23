import React, { use } from "react";
import { useState, useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const BookDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const searchBookSummary = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${API_URL}/api/books/book/${id}`, { signal: controller.signal });
        
      } catch (error) {
        if (error.name != "AbortError") {
          console.error("Search for Summary failed: ", error);
        }
      }
    };

    searchBookSummary();

    return () => controller.abort;
  }, [id]);

  return <div>Book Details Page</div>;
};

export default BookDetails;
