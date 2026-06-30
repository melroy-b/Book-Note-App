import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBookNoteSearch } from "../hooks/useBookSearch";
import BookCoverGrid from "../components/BookCoverGrid";
import BookMetaGrid from "../components/BookMetaGrid";
import Box from "@mui/material/Box";

const NoteEdit = () => {
  const { noteId } = useParams();
  const { userAuth } = useOutletContext();
  const { fetchBookNote } = useBookNoteSearch();
  const [existingNote, setExistingNote] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      const response = await fetchBookNote(userAuth?.user.id, noteId);
      if (!response?.data || response.data.length === 0) {
        console.error(`No note found for noteId: ${noteId}`);
        setExistingNote(null);
        return;
      }
      setExistingNote(response.data[0]);
    }

    fetchNote();
  }, [existingNote?.user_id]);

  // Called by child component when the content gets updated
  function onNoteFetched(fetchedNote) {
    setExistingNote(fetchedNote);
  }

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gridTemplateRows: "0.3fr auto",
          gap: 1,
        }}
      >
        <BookCoverGrid
          rawCovers={existingNote?.book_cover ? [existingNote.book_cover] : []}
          bookTitle={existingNote?.title}
          authorName={existingNote?.author_name}
          authorId={existingNote?.author_key}
          bookOLID={existingNote?.ol_id}
          onNoteFetched={onNoteFetched}
        />
        <BookMetaGrid
          title={existingNote?.title}
          personal_name={existingNote?.author_name}
          authorId={existingNote?.author_key}
          bookOLID={existingNote?.ol_id}
          created_at={existingNote?.created_at}
          date_read={existingNote?.date_read}
          publish_date={null}
          publishers={[]}
          descriptionText={existingNote?.content}
        />
      </Box>
    </Box>
  );
};

export default NoteEdit;

// {
//     "id": 9,
//     "user_id": 1,
//     "book_id": 9,
//     "content": "Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish Gibberish",
//     "date_read": "2026-04-01T18:30:00.000Z",
//     "created_at": "2026-04-18T15:53:08.731Z",
//     "rating": null,
//     "title": "The Art of War",
//     "book_cover": "4849549",
//     "ol_id": "OL244537W",
//     "author_name": "Sunzi",
//     "author_key": "OL30553A"
// }
