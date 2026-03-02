import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const DropDownLink = (props) => {
  console.log("DropDownLink props:", props);
  const {
    cover_i = null,
    title = "Untitled",
    key: bookKey = "*",
    author_name: rawAuthorName = [],
    author_key: rawAuthorKey = [],
  } = props?.book ?? {};

  const author_name = Array.isArray(rawAuthorName)
    ? rawAuthorName[0]
    : "Unknown Author";
  const authorKey = Array.isArray(rawAuthorKey) ? rawAuthorKey[0] : "";

  const filterBookKey = () => {
    // Extract the ID from the key, which is in the format "/works/OL12345W"
    const bookMatch = bookKey.match(/\/works\/OL\d+W/);

    return bookMatch?.[0].split("/").pop() ?? "";
  };

  return (
    <Link
      className="d-flex"
      to={`/book/${encodeURIComponent(
        filterBookKey(),
      )}/author/${encodeURIComponent(authorKey)}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        props.setShowDropdown(false);
        props.setSearchText("");
      }}
      style={{
        display: "block",
        padding: "5px",
        textDecoration: "none",
        color: "black",
        fontSize: "1em",
        borderBottom: "1px solid #9b9595",
      }}
    >
      <Box
        sx={{
          padding: "5px",
          width: "70px",
          height: "80px",
          borderRadius: "5px",
          flexShrink: 0,
        }}
      >
        <img
          src={
            typeof cover_i === "number"
              ? `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`
              : "https://dummyimage.com/70x80/cccccc/000000&text=No+Cover"
          }
          alt="book cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        />
      </Box>
      <div style={{ paddingLeft: "2px" }}>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <div style={{ fontWeight: "lighter", fontSize: "0.9rem" }}>
          by {Array.isArray(author_name) ? author_name[0] : "Unknown Author"}
        </div>
      </div>
    </Link>
  );
};

export default DropDownLink;
