import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

/**
 * Shows book title, author, expandable description, and publishing metadata.
 */
const BookMetaGrid = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    setIsExpanded(false);
    // Enable the read-more control only when the description overflows.
    setCanExpand(el.scrollHeight > el.clientHeight + 1);
  }, [props.descriptionText]);

  return (
    <>
      <Box
        //className="p-3 border rounded d-flex flex-column"
        //size={{ xs: 12, lg: 9 }}
        sx={{
          gridColumn: "1",
          gridRow: "1",
        }}
      >
        <Box className="book-description__wrapper">
          {/* Book title and author section */}
          <Box>
            <h1 className="display-6 fst-italic">{props.title}</h1>{" "}
            <p>
              by{" "}
              <a href={`https://openlibrary.org/authors/${props.authorId}`}>
                {props.personal_name}
              </a>
              <span style={{ fontWeight: "lighter" }}>
                {" "}
                ({props.revision ?? 0})
              </span>
            </p>
          </Box>
        </Box>
      </Box>

      <Box
        //className="p-3 d-flex flex-column"
        sx={{
          display: "flex",
          flexDirection: "column",
          gridColumn: "1",
          gridRow: { xs: "3", md: "2" },
        }}
      >
        {/* Book description section */}
        <Box>
          <p
            ref={descriptionRef}
            className={`book-description${
              canExpand && !isExpanded ? "--expandable" : ""
            }${isExpanded ? "--expanded" : ""}`.trim()}
          >
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {props.descriptionText}
            </Typography>
          </p>
          {canExpand && (
            <button
              className="read-more-btn"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? (
                <>
                  Read Less <KeyboardArrowUpIcon />
                </>
              ) : (
                <>
                  Read More <KeyboardArrowDownIcon />
                </>
              )}
            </button>
          )}
        </Box>

        {/* Book Metadata */}
        {props.publish_date != null || props.publishers?.length > 0 ? (
          <Box className="book-meta__container">
            <Box className="book-meta__item">
              <span>Publish Date</span>
              <p>{props.publish_date}</p>
            </Box>
            <Box className="book-meta__item">
              <span>Publisher</span>
              <a
                href={`https://openlibrary.org/publishers/${encodeURIComponent(
                  props.publishers[0] || "Unknown Publisher"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{props.publishers[0] || "Unknown Publisher"}</p>
              </a>
            </Box>
            <Box className="book-meta__item">
              <span>Language</span>
              <p>{props.bookLanguage}</p>
            </Box>
            <Box className="book-meta__item">
              <span>Pages</span>
              <p>{props.number_of_pages || "NA"}</p>
            </Box>
          </Box>
        ) : (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginTop: 4 }}
            spacing={{ xs: 0.5, sm: 3 }}
          >
            <Typography variant="caption" color="text.secondary">
              Open Library ID: {props.bookOLID}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Author Key: {props.authorId}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Created: {new Date(props.created_at).toLocaleString()}
            </Typography>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default BookMetaGrid;
