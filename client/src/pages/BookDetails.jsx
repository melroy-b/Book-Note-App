import { useParams } from "react-router-dom";
import useBookDetail from "../hooks/useBookDetail";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const BookDetails = () => {
  const { id } = useParams();

  //Custom hooks
  const bookDetail = useBookDetail(id);
  console.log("Book Detail:", bookDetail);

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

  function extractBookDescription(bookDetail) {
    const description =
      typeof bookDetail?.description === "string"
        ? bookDetail.description
        : (bookDetail.description?.value ?? "No description available.");
    return description;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 5, lg: 3 }}>
          <Item>
            <Box
              sx={{
                padding: "10px",
                justifyItems: "center",
                border: "1px solid #dbd2d2",
                borderRadius: "5px",
              }}
            >
              <Box
                sx={{
                  padding: "5px",
                  width: "200px",
                  height: "300px",
                  borderRadius: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={
                    bookDetail?.covers?.length > 0
                      ? `https://covers.openlibrary.org/b/id/${bookDetail.covers[0]}-M.jpg`
                      : "https://dummyimage.com/150x200/cccccc/000000&text=No+Cover"
                  }
                  alt="book-cover-main"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Item>
            <Box id="book-description">
              <h2>{bookDetail?.title}</h2>
              <p style={{ fontSize: "12px", textAlign: "left", maxLines: 3 }}>
                {extractBookDescription(bookDetail)}
              </p>
            </Box>
          </Item>
        </Grid>

        {/* <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{ fontSize: "12px" }}
          size={12}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>© Copyright</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <Item>Link A</Item>
            </Grid>
            <Grid>
              <Item>Link B</Item>
            </Grid>
            <Grid>
              <Item>Link C</Item>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default BookDetails;
