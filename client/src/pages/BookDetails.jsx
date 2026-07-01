import { useParams, useSearchParams } from "react-router-dom";
import useBookDetail from "../hooks/useBookDetail";
import BookCoverGrid from "../components/BookCoverGrid";
import BookMetaGrid from "../components/BookMetaGrid";
// MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

/**
 * Displays a selected book's details, cover, metadata, and note action.
 */
const BookDetails = () => {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("author");
  const editionId = searchParams.get("edition");

  // Load Open Library details through the app API.
  const bookDetail = useBookDetail(bookId, authorId, editionId);

  const {
    title = "Untitled",
    covers: rawCovers = [],
    revision = 0,
    author: { personal_name, name } = {},
    edition: {
      publishers = [],
      publish_date = "NA",
      number_of_pages = null,
    } = {},
    languages: { name: bookLanguage = "English" } = {},
  } = bookDetail || {};

  const rawDescription = bookDetail?.description;
  // Open Library may return descriptions as either plain text or an object.
  const descriptionText =
    typeof rawDescription === "string"
      ? rawDescription
      : rawDescription?.value || "No description available";
  const authName =
    personal_name != null
      ? personal_name
      : name != null
      ? name
      : "Unknown Author";

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Book Details
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gridTemplateRows: "0.3fr auto",
          gap: 1,
        }}
      >
        {/* Book metadata grid (title, author, etc.) */}
        <BookMetaGrid
          title={title}
          authorName={authName}
          revision={revision}
          descriptionText={descriptionText}
          publish_date={publish_date}
          publishers={publishers}
          bookLanguage={bookLanguage}
          number_of_pages={number_of_pages}
          authorId={authorId}
        />
        {/* Book cover grid (book cover, rating, note button, etc.) */}
        <BookCoverGrid
          rawCovers={rawCovers}
          bookTitle={title}
          authorName={authName}
          authorId={authorId}
          bookOLID={bookId}
        />
      </Box>
    </Box>
  );
};

export default BookDetails;
