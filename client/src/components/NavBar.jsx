import { useState } from "react";
import { Link } from "react-router-dom";

// MUI components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BrandLogo from "../assets/journal-bookmark-fill.svg";

// Custom hooks
import useDebounce from "../hooks/useDebounce";
import useBookSearch from "../hooks/useBookSearch";

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
        width: "35ch",
      },
    },
  },
}));

const filterBookKey = (key) => {
  // Extract the ID from the key, which is in the format "/works/OL12345W"
  const match = key.match(/\/works\/OL\d+W/);
  const splitKey = match[0].split("/").pop();
  return splitKey; // Return the matched ID or the original key if no match
};

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
          <img
            src={BrandLogo}
            alt="Brand logo"
            style={{
              filter: "invert(1)",
              height: "40px",
              width: "40px",
              marginRight: "15px",
            }}
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
            // Show dropdown on focus after a delay if there are results, otherwise hide it
            onFocus={() => {
              setTimeout(() => {
                setShowDropdown(results.length > 0);
              }, 200);
            }}
            // Delay hiding the dropdown to allow click events on dropdown items
            onBlur={() => {
              setTimeout(() => {
                setShowDropdown(false);
              }, 150);
            }}
          />

          {showDropdown && (
            <div className="nav-search-dropdown">
              {loading && <div style={dropdownStyle}>Searching..</div>}
              {!loading && results.length == 0 && (
                <div style={dropdownStyle}>No items match your search</div>
              )}
              {!loading &&
                results.map((book) => (
                  <Link
                    className="d-flex"
                    key={filterBookKey(book.key)}
                    to={`/book/${encodeURIComponent(filterBookKey(book.key))}`}
                    style={{
                      display: "block",
                      padding: "5px",
                      textDecoration: "none",
                      color: "black",
                      fontSize: "1em",
                      borderBottom: "1px solid #9b9595",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px",
                        width: "70px",
                        height: "80px",
                        borderRadius: "5px",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={
                          book?.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                            : "https://dummyimage.com/70x80/cccccc/000000&text=No+Cover"
                        }
                        alt="book cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </div>
                    <div style={{ paddingLeft: "2px" }}>
                      <div style={{ fontWeight: "bold" }}>{book.title}</div>
                      <div
                        style={{ fontWeight: "lighter", fontSize: "0.9rem" }}
                      >
                        by{" "}
                        {Array.isArray(book?.author_name)
                          ? book.author_name[0]
                          : "Unknown Author"}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </Search>
      </Container>
    </Navbar>
  );
};

export default NavBar;
