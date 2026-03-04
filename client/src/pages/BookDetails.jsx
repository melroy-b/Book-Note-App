import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useBookDetail from "../hooks/useBookDetail";
// MUI components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";

const BookDetails = () => {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("author");
  const editionId = searchParams.get("edition");
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const descriptionRef = useRef(null);

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    setIsExpanded(false);
    // Check if the content overflows the container
    setCanExpand(el.scrollHeight > el.clientHeight);
  }, [descriptionText]);

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container className="rounded text-body-emphasis" spacing={1}>
        <Grid className="p-3 border rounded flex-column" size={{ lg: 9 }}>
          <h1 className="display-6 fst-italic">{title}</h1>{" "}
          <p>
            by{" "}
            <a href={`https://openlibrary.org/authors/${authorId}`}>
              {personal_name}
            </a>
            <span style={{ fontWeight: "lighter" }}> ({revision})</span>
          </p>
          <p
            ref={descriptionRef}
            className={`book-description my-3 ${
              isExpanded ? "book-description--expanded" : ""
            }`}
          >
            {descriptionText}
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
          <Box className="book-meta__container">
            <Box className="book-meta__item">
              <span>Publish Date</span>
              <p>{publish_date}</p>
            </Box>
            <Box className="book-meta__item">
              <span>Publisher</span>
              <a
                href={`https://openlibrary.org/publishers/${encodeURIComponent(
                  publishers[0] || "Unknown Publisher"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{publishers[0] || "Unknown Publisher"}</p>
              </a>
            </Box>
            <Box className="book-meta__item">
              <span>Language</span>
              <p>{bookLanguage}</p>
            </Box>
            <Box className="book-meta__item">
              <span>Pages</span>
              <p>{number_of_pages || "NA"}</p>
            </Box>
          </Box>
        </Grid>

        <Grid
          className="p-1 flex-column justify-content-center border rounded"
          size={{ lg: 3 }}
        >
          <Box className="cover-image__container align-items-start">
            <img
              className="cover-image__item"
              src={
                rawCovers?.length > 0
                  ? `https://covers.openlibrary.org/b/id/${rawCovers[0]}-M.jpg`
                  : "https://dummyimage.com/150x200/cccccc/000000&text=No+Cover"
              }
              alt="book-cover-main"
            />
          </Box>
          <Button variant="outlined">Outlined</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookDetails;
