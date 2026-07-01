import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Divider,
  Rating,
} from "@mui/material";

/**
 * Displays one saved book note with cover, metadata, and note preview.
 */
const BookCard = ({ book }) => {
  return (
    <Card
      sx={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        gap: 3,
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={`https://covers.openlibrary.org/b/id/${book.book_cover}-L.jpg`}
        alt={book.title}
        sx={{
          width: 120,
          height: 180,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 }, flex: 1 }}>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={700}>
            {book.title}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {book.author_name}
          </Typography>

          <Rating name="half-rating" value={book.rating} readOnly />

          <Chip
            label={`Read on ${new Date(book.date_read).toLocaleDateString()}`}
            size="small"
            sx={{ width: "fit-content" }}
          />

          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {book.content}
          </Typography>

          <Divider sx={{ borderColor: "grey.400" }}></Divider>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 0.5, sm: 3 }}
          >
            <Typography variant="caption" color="text.secondary">
              Open Library ID: {book.ol_id}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Author Key: {book.author_key}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Created: {new Date(book.created_at).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookCard;
