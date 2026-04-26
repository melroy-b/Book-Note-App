import { useParams, useSearchParams } from "react-router-dom";
import useBookDetail from "../hooks/useBookDetail";
import BookCoverGrid from "../components/BookCoverGrid";
import BookMetaGrid from "../components/BookMetaGrid";
// MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const BookDetails = () => {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("author");
  const editionId = searchParams.get("edition");

  //Custom hooks
  const bookDetail = useBookDetail(bookId, authorId, editionId);

  const {
    title = "Untitled",
    covers: rawCovers = [],
    revision = 0,
    author: { personal_name = "Unknown Author" } = {},
    edition: {
      publishers = [],
      publish_date = "NA",
      number_of_pages = null,
    } = {},
    languages: { name: bookLanguage = "English" } = {},
  } = bookDetail || {};

  const rawDescription = bookDetail?.description;
  const descriptionText =
    typeof rawDescription === "string"
      ? rawDescription
      : rawDescription?.value || "No description available";

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gridTemplateRows: "auto auto",
          gap: 1,
        }}
      >
        {/* Book metadata grid (title, author, etc.) */}
        <BookMetaGrid
          title={title}
          personal_name={personal_name}
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
          authorName={personal_name}
          authorId={authorId}
          bookOLID={bookId}
        />
      </Box>
    </Box>
  );
};

export default BookDetails;
