import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const DropDownLink = (props) => {
  const {
    cover_i = null,
    title = "Untitled",
    key: bookKey = "*",
    author_name: rawAuthorName = [],
    author_key: rawAuthorKey = [],
    cover_edition_key = "",
  } = props?.book ?? {};

  const author_name = Array.isArray(rawAuthorName)
    ? rawAuthorName[0]
    : "Unknown Author";
  const authorKey = Array.isArray(rawAuthorKey) ? rawAuthorKey[0] : "";
  const bookId = bookKey.includes("/works/")
    ? bookKey.split("/").pop()
    : bookKey;

  return (
    <Link
      className="d-flex dropdown-link"
      to={`/book/${encodeURI(bookId)}?author=${encodeURIComponent(authorKey)}&edition=${encodeURIComponent(cover_edition_key)}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        props.setShowDropdown(false);
        props.setSearchText("");
      }}
    >
      <Box className="dropdown-link--cover">
        <img
          src={
            typeof cover_i === "number"
              ? `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`
              : "https://dummyimage.com/70x80/cccccc/000000&text=No+Cover"
          }
          alt="book cover"
        />
      </Box>
      <Box sx={{ paddingLeft: "2px" }}>
        <Box sx={{ fontWeight: "bold" }}>{title}</Box>
        <Box sx={{ fontWeight: "lighter", fontSize: "0.9rem" }}>
          by {author_name}
        </Box>
      </Box>
    </Link>
  );
};

export default DropDownLink;
