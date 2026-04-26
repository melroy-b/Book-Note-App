import { useState } from "react";
import AddNoteModal from "../components/AddNoteModal";
import usePostBookNote from "../hooks/usePostBookNote";
import AutohideSnackbar from "./Snackbar";
// MUI components
import { Box, Grid } from "@mui/material";
//import EditNoteIcon from "@mui/icons-material/EditNote";
import StarIcon from "@mui/icons-material/Star";

const BookCoverGrid = (props) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [snackBar, setSnackBar] = useState({
    open: false,
    variant: "success",
    message: "",
  });

  const { postBookNote, loading } = usePostBookNote();
  async function onSubmit(params) {
    let response = {};
    try {
      response = await postBookNote(params);
      if (response.error != "") {
        throw new Error(response.error);
      }
      if (response.success) {
        setSnackBar({
          open: true,
          variant: "success",
          message: "Note saved successfully into database",
        });
      }
    } catch (error) {
      setSnackBar({
        open: true,
        variant: "error",
        message: error.message ?? "There was an internal server error",
      });
    }
    return response;
  }

  return (
    <Box
      //className="p-3 d-flex flex-column align-items-center"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gridColumn: { xs: "1", md: "2" },
        gridRow: { xs: "auto", md: "1 / 3" },
        order: { xs: 2, md: 1 },
      }}
    >
      <Box className="cover-image__container">
        <img
          className="cover-image__item"
          src={
            props.rawCovers?.length > 0
              ? `https://covers.openlibrary.org/b/id/${props.rawCovers[0]}-M.jpg`
              : "https://dummyimage.com/150x200/cccccc/000000&text=No+Cover"
          }
          alt="book-cover-main"
        />
      </Box>
      <Box className="rating-star__container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-${star}`}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            <StarIcon
              sx={{
                color: star <= hoveredStar ? "#ffc107" : "#bdbdbd",
                height: "32px",
                width: "32px",
                cursor: "pointer",
              }}
            />
          </button>
        ))}
      </Box>
      <Box className="d-flex gap-2">
        <AddNoteModal
          bookTitle={props.bookTitle}
          bookCover={props.rawCovers[0]}
          authorName={props.authorName}
          authorID={props.authorId}
          bookOLID={props.bookOLID}
          onSubmit={onSubmit}
          loading={loading}
        />
      </Box>

      {/* success / error message for good UX */}
      <AutohideSnackbar
        open={snackBar.open}
        message={snackBar.message}
        variant={snackBar.variant}
        onClose={() => {
          setSnackBar((currentValue) => ({ ...currentValue, open: false }));
        }}
      />
    </Box>
  );
};

export default BookCoverGrid;
