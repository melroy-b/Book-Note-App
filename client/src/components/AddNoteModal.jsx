import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";
import { useBookNoteSearch } from "../hooks/useBookSearch";
import {
  Box,
  Button,
  Tooltip,
  Modal,
  TextField,
  Stack,
  Typography,
  Rating,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/**
 * Opens a modal for authenticated users to add a note and read date for a book.
 */
const AddNoteModal = (props) => {
  const [open, setOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [user, setUser] = useState({ userID: null, userName: "Unknown User" });
  const [date, setDate] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}${location.hash}`;
  const { isAuthenticated, userAuth } = useCheckAuthentication();
  const { fetchBookNote } = useBookNoteSearch();

  useEffect(() => {
    const fetchExistingNote = async () => {
      if (isAuthenticated) {
        // Check for an existing note and prefill the form for editing if found.
        const response = await fetchBookNote(
          userAuth?.user.id,
          props?.bookOLID
        );
        if (response.success) {
          console.log("Existing note fetched:", response.data);
          setNoteContent(response.data[0]?.content ?? "");
          setDate(
            response.data[0]?.date_read
              ? dayjs(response.data[0]?.date_read)
              : null
          );
          setRating(response.data[0]?.rating ?? null);
        }
      }
    };

    fetchExistingNote();
  }, [isAuthenticated, open]);

  // Require login before opening the note form.
  const handleOpen = async () => {
    // Avoid a redirect loop by checking authentication status before navigating to login.
    if (!isAuthenticated) {
      navigate(`/login?returnTo=${encodeURIComponent(returnTo)}`, {
        replace: true,
      });
      return;
    }

    setUser({
      userID: userAuth?.user.id,
      userName: userAuth?.user.username ?? "Unknown User",
    });

    // Open the note form modal.
    setOpen(true);
  };

  // Close the modal and clear validation messages.
  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  // Validate the note and hand the normalized payload to the parent submitter.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedNote = noteContent.trim();
    if (!trimmedNote) {
      setError("Please enter a note before submitting.");
      return;
    }

    const response = await props.onSubmit?.({
      noteContent: trimmedNote,
      bookTitle: props?.bookTitle,
      bookCover: props?.bookCover,
      authorName: props?.authorName,
      authorID: props?.authorID,
      bookOLID: props?.bookOLID,
      userName: user?.userName,
      userID: user?.userID,
      date_read: date ? date.format("YYYY-MM-DD") : null,
      rating: rating,
    });

    if (response.success) {
      setNoteContent("");
      setDate(null);
      setRating(null);
      handleClose();
    }
  };

  // Restore the modal to its initial note state.
  const handleReset = () => {
    setNoteContent(
      noteContent.length === 0 ? props.initialNote ?? "" : noteContent
    );
    setDate(null);
    setRating(null);
    setError("");
  };

  return (
    <Box>
      <Box className="rating-star__container">
        <Rating
          name="half-rating"
          value={rating}
          onChange={(event, newValue) => {
            handleOpen();
            setRating(newValue);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Tooltip title="Add your book notes" placement="right">
          <Button sx={{ color: "#414141" }} onClick={handleOpen}>
            <EditNoteIcon sx={{ height: "40px", width: "40px" }} />
            Note
          </Button>
        </Tooltip>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-content__container">
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Stack for book title, author, user name & id */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={2}
              sx={{ borderBottom: "1px solid #757474", paddingBottom: "10px" }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Title
                </Typography>
                <Typography variant="body1">
                  {props?.bookTitle || "Unknown Title"}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mt: 1.5 }}
                >
                  Author
                </Typography>
                <Typography variant="body1">
                  {props?.authorName || "Unknown Author"}
                </Typography>
              </Box>
              <Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    User name
                  </Typography>
                  <Typography variant="body1">{user.userName}</Typography>
                </Box>
                <Box sx={{ mt: 3.5 }}>
                  <Rating
                    name="half-rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
              </Box>
            </Stack>

            {/* Date picker for book read */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="When did you read it?"
                disableFuture
                value={date ?? null}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                slotProps={{
                  textField: {
                    helperText: "MM/DD/YYYY",
                  },
                }}
                required
              />
            </LocalizationProvider>

            {/* Book note field */}
            <TextField
              id="book-note"
              name="note"
              label="Add your note"
              placeholder="Write your thoughts about the book..."
              multiline
              minRows={8}
              maxRows={12}
              fullWidth
              required
              value={noteContent}
              onChange={(event) => {
                setNoteContent(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              error={Boolean(error)}
              helperText={error || `${noteContent.trim().length} characters`}
            />

            {/* Guided buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" color="inherit" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                loading={props.loading}
                loadingPosition="start"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddNoteModal;
