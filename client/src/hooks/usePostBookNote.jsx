import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const usePostBookNote = () => {
  const [loading, setLoading] = useState(false);

  const postBookNote = async (payload) => {
    let postResponse = {};
    let postData = {};
    try {
      setLoading(true);

      postResponse = await fetch(`${API_URL}/api/books/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      postData = await postResponse.json();
      if (!postResponse.ok) {
        throw new Error(`
          ${postData.message || "Failed to post note"}:
          ${postData.error ?? "UNKNOWN CODE"}`);
      }

      //For testing purpose
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 1000);
      // });

      console.log("Note submitted:", payload);
      return { success: true, error: "", data: postData };
    } catch (error) {
      //console.log(postResponse);
      console.error("Error posting note:", error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { postBookNote, loading };
};

export default usePostBookNote;
