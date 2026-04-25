import { useState, useRef, useEffect } from "react";
import DropDownLink from "./DropDownLink";
import { Link } from "react-router-dom";
import { AccountMenu } from "./AccountMenu";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

// MUI components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);

  // Custom hooks
  const debouncedText = useDebounce(searchText, 350);
  const [results, loading, showDropdown, setShowDropdown] =
    useBookSearch(debouncedText);
  const [isAuthenticated, setIsAuthenticated] = useCheckAuthentication();

  useEffect(() => {
    const handleOutsidePointer = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [setShowDropdown]);

  return (
    <Navbar
      className="navbar"
      style={{ backgroundColor: "#773e3e" }}
      data-bs-theme="dark"
    >
      <Container className="d-flex flex-wrap">
        <Navbar.Brand>
          <Link className="nav-link brand" to="/">
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
          </Link>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Link className="nav-link child" to="/">
            Home
          </Link>
          <Link className="nav-link child" to="/contact">
            Contact
          </Link>
          <Link className="nav-link child" to="/mybooks">
            My Books
          </Link>
        </Nav>

        <Search ref={searchRef}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search Books"
            inputProps={{ "aria-label": "search", autoComplete: "off" }}
            id="navbar-search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            // Show dropdown on focus after delay to match the search UI/UX
            onFocus={() => {
              setTimeout(() => {
                setShowDropdown(results.length > 0);
              }, 250);
            }}
            // Delay hiding the dropdown to allow click events on dropdown items
            onBlur={() => {
              setTimeout(() => {
                setShowDropdown(false);
              }, 150);
            }}
          />

          {showDropdown && (
            <Box className="nav-search-dropdown">
              {loading && (
                <Box className="nav-search-dropdown__loading">Searching..</Box>
              )}
              {!loading && results.length == 0 && (
                <Box className="nav-search-dropdown__empty">
                  No items match your search
                </Box>
              )}
              {!loading &&
                results.map((book) => (
                  //Dropdown component that links to book details page with book key and author key as params
                  <DropDownLink
                    key={book?.key}
                    book={book}
                    setShowDropdown={setShowDropdown}
                    setSearchText={setSearchText}
                  />
                ))}
            </Box>
          )}
        </Search>

        {/* Log in / Register Buttons / Account Menu */}
        {isAuthenticated ? (
          <AccountMenu setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Stack direction="row" spacing={1} sx={{ px: 1 }}>
            <Button
              variant="text"
              component={Link}
              to={"/login"}
              sx={{
                textTransform: "none",
                color: "#ffff",
                "&:hover": {
                  textUnderlineOffset: "5px",
                  textDecoration: "underline",
                },
              }}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={"/register"}
              sx={{
                textTransform: "none",
                borderColor: "#fff",
                backgroundColor: "#fff",
                color: "#773e3e",
                "&:hover": {
                  backgroundColor: "#773e3e",
                  color: "#ffff",
                },
              }}
            >
              Register
            </Button>
          </Stack>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
