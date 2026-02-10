import Button from "@mui/material/Button";

const Hero = () => {
  const handleSearchClick = () => {
    const searchInput = document.getElementById("navbar-search-input");
    if (!searchInput) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    searchInput.focus();
    searchInput.select?.();
  };

  return (
    <div>
      <div className="px-4 py-5 my-2 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Make the most of your reading experience
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly search and make notes on your favorite books. Organize your
            thoughts and share them with friends. Your reading companion,
            reimagined.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button
              variant="contained"
              //   className="btn btn-dark btn-lg px-4 gap-3"
              type="button"
              onClick={handleSearchClick}
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "#773e3e",
                "&:hover": { bgcolor: "#530909" },
              }}
            >
              Search Books
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
