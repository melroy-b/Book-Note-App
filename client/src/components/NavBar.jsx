import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useBookSearch from "../hooks/useBookSearch";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "white",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  flexBasis: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavBar = () => {
  const [searchText, setSearchText] = useState("");

  // Custom hooks
  const debouncedText = useDebounce(searchText, 350);
  const [results, loading, showDropdown, setShowDropdown] =
    useBookSearch(debouncedText);

  const dropdownStyle = { padding: "10px 10px" };

  return (
    <Navbar style={{ backgroundColor: "#773e3e" }} data-bs-theme="dark">
      <Container className="d-flex flex-wrap">
        <Navbar.Brand href="/">
          <BookmarkAddedIcon
            fontSize="large"
            style={{ color: "white", marginRight: "15px" }}
          />
          <span className="brand fs-4">Book Notes</span>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/library">Library</Nav.Link>
        </Nav>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search Books"
            inputProps={{ "aria-label": "search" }}
            id="navbar-search-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onFocus={() => setShowDropdown(results.length > 0)}
            onBlur={() => {
              setTimeout(() => {
                setShowDropdown(false);
              }, 150);
            }}
          />

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                right: 0,
                background: "#ffffff",
                backgroundColor: "#e7e4e4",
                color: "#222",
                borderRadius: "6px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                zIndex: 9999,
                maxHeight: "380px",
                overflowY: "auto",
              }}
            >
              {loading && <div style={dropdownStyle}>Searching..</div>}
              {!loading && results.length == 0 && (
                <div style={dropdownStyle}>No items match your search</div>
              )}
              {!loading &&
                results.map((book) => (
                  <a
                    className="d-flex"
                    key={book.id}
                    href={`/book/${book.id}`}
                    style={{
                      display: "block",
                      padding: "10px 10px",
                      textDecoration: "none",
                      color: "black",
                      fontSize: "1em",
                      borderBottom: "1px solid #9b9595",
                    }}
                  >
                    <img
                      src={
                        book?.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                          : "https://dummyimage.com/80x100/cccccc/000000&text=No+Cover"
                      }
                      alt="book cover"
                      style={{
                        padding: "5px",
                        width: "80px",
                        height: "100px",
                        objectFit: "fill",
                        borderRadius: "5px",
                      }}
                    />
                    <div className="p-2">
                      <div style={{ fontWeight: "bold" }}>{book.title}</div>
                      <div
                        style={{ fontWeight: "lighter", fontSize: "0.9rem" }}
                      >
                        by {book.author_name[0]}
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          )}
        </Search>
      </Container>
    </Navbar>
  );
};

export default NavBar;
