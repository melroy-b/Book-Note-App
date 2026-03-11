import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BookCoverGrid = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    setIsExpanded(false);
    // Check if the content overflows the container
    setCanExpand(el.scrollHeight > el.clientHeight);
  }, [props.descriptionText]);

  return (
    <Grid
      className="p-3 border rounded d-flex flex-column"
      size={{ xs: 12, lg: 9 }}
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
            <span style={{ fontWeight: "lighter" }}> ({props.revision})</span>
          </p>
        </Box>
        {/* Book description section */}
        <Box>
          <p
            ref={descriptionRef}
            className={`book-description${
              canExpand && !isExpanded ? "--expandable" : ""
            }${isExpanded ? "--expanded" : ""}`.trim()}
          >
            {props.descriptionText}
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
      </Box>
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
    </Grid>
  );
};

export default BookCoverGrid;
