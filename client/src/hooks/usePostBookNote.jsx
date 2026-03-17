import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const usePostBookNote = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const postBookNote = async (payload) => {
    let postResponse = {};
    let postData = {};
    try {
      setLoading(true);
      setSuccess(false);
      setError("");

      postResponse = await fetch(`${API_URL}/api/books/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      postData = await postResponse.json();
      if (!postResponse.ok) {
        throw new Error(postData.message || "Failed to post note");
      }

      //For testing purpose
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 1000);
      // });

      setSuccess(true);
      console.log("Note submitted:", payload);
      // return postData;
    } catch (error) {
      //console.log(postResponse);
      setError(error.message);
      setSuccess(false);
      console.error("Error posting note:", error.message);
    } finally {
      setLoading(false);
      return {
        success,
        error,
        data: postResponse?.ok
          ? postData
          : "Data corrupted / Page not available",
      };
    }
  };

  return { postBookNote, loading, success, error };
};

export default usePostBookNote;
