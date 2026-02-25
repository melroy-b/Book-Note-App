import React, { use } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const BookDetails = () => {
  const { id } = useParams();

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
      } catch (error) {
        if (error.name != "AbortError") {
          console.error("Search for book summary failed: ", error);
        }
      }
    };

    searchBookSummary();

    return () => controller.abort;
  }, [id]);

  return <div>Book Details Page</div>;
};

export default BookDetails;
