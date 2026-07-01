import { useOutletContext, Link } from "react-router-dom";
import { useDBBookSearch } from "../hooks/useBookSearch";
import BookCard from "../components/BookCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

/**
 * Renders the saved books and notes for the current user.
 */
const MyBooks = () => {
  const { userAuth } = useOutletContext();

  const userId = userAuth?.user?.id;
  const { books } = useDBBookSearch(userId);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1240,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
      }}
    >
      {books?.length > 0
        ? books.map((item) => {
            console.log(item);
            return (
              <Button
                key={item.id}
                component={Link}
                to={`/editnote/${item.ol_id}`}
                sx={{
                  width: "100%",
                  display: "block",
                  p: 0,
                  mb: 3,
                  color: "inherit",
                  textAlign: "left",
                  textDecoration: "none",
                  textTransform: "none",
                }}
              >
                <BookCard book={item} />
              </Button>
            );
          })
        : "No books to display yet"}
    </Box>
  );
};

export default MyBooks;

// [
//   {
//     id: 1,
//     user_id: 1,
//     book_id: 1,
//     content: 'fdsfdsfdsfsfsdfsdfdsfsdfdsddd',
//     date_read: 2026-03-02T18:30:00.000Z,
//     created_at: 2026-03-20T17:13:57.243Z,
//     title: 'The Hobbit',
//     book_cover: '14627509',
//     ol_id: 'OL27482W',
//     author_name: 'J. R. R. Tolkien',
//     author_key: 'OL26320A'
//   },
//   {
//     id: 2,
//     user_id: 1,
//     book_id: 2,
//     content: 'Best Book 😁',
//     date_read: 2026-03-04T18:30:00.000Z,
//     created_at: 2026-03-20T17:17:23.847Z,
//     title: 'Harry Potter and the Deathly Hallows',
//     book_cover: '15158660',
//     ol_id: 'OL82586W',
//     author_name: 'J. K. Rowling',
//     author_key: 'OL23919A'
//   },
//   {
//     id: 3,
//     user_id: 1,
//     book_id: 3,
//     content: 'rtrq',
//     date_read: 2026-02-02T18:30:00.000Z,
//     created_at: 2026-03-20T17:20:54.066Z,
//     title: 'Lord of the Flies',
//     book_cover: '8684447',
//     ol_id: 'OL455327W',
//     author_name: 'William Golding',
//     author_key: 'OL335424A'
//   },
// ]
