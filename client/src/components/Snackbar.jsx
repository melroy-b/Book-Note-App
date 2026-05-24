import { useState } from "react";
import { Snackbar, Box, Alert } from "@mui/material";

/**
 * Shows a temporary success or error alert anchored to the bottom right.
 */
const AutohideSnackbar = (props) => {
  // Ignore clickaway closes but forward all other close events to the parent.
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.onClose?.(event, reason);
  };

  return (
    <Box>
      <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={props.variant}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AutohideSnackbar;
