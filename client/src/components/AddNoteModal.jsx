import { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Modal,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddNoteModal = (props) => {
  const [open, setOpen] = useState(false);
  const [noteContent, setNoteContent] = useState(props.initialNote ?? "");
  const [date, setDate] = useState(
    props.date_read ? dayjs(props.date_read) : null,
  );
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedNote = noteContent.trim();
    if (!trimmedNote) {
      setError("Please enter a note before submitting.");
      return;
    }

    console.log("Submitting note:", trimmedNote);
    const response = await props.onSubmit?.({
      noteContent: trimmedNote,
      bookTitle: props?.bookTitle,
      authorName: props?.authorName,
      authorID: props?.authorID,
      bookOLID: props?.bookOLID,
      userName: props?.userName,
      date_read: date ? date.format("YYYY-MM-DD") : null,
    });

    if (response.success) {
      setNoteContent("");
      handleClose();
    }
  };

  const handleReset = () => {
    setNoteContent(props.initialNote ?? "");
    setDate(null);
    setError("");
  };

  return (
    <Box>
      <Tooltip title="Add your book notes" placement="right">
        <Button sx={{ color: "#414141" }} onClick={handleOpen}>
          <EditNoteIcon sx={{ height: "40px", width: "40px" }} />
          Note
        </Button>
      </Tooltip>
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
                <Typography variant="subtitle2" color="text.secondary">
                  User name
                </Typography>
                <Typography variant="body1">
                  {props?.userName || "Unknown User"}
                </Typography>
                {/* <Typography variant="subtitle2" hidden>
                  {props.userID ?? 1}
                </Typography> */}
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
