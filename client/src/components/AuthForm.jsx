import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import { Link as RouterLink } from "react-router-dom";
import BookLibrary from "../assets/book-library.jpg";

const AuthForm = (props) => {
  return (
    <Box>
      <Paper elevation={0}>
        <Grid container>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              order: { xs: 1, md: 2 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 3, md: 6 },
            }}
          >
            <Box
              component="img"
              src={BookLibrary}
              alt="Books and notes illustration"
              fetchpriority="high"
              decoding="sync"
              sx={{
                width: "100%",
                maxWidth: 420,
                height: "auto",
              }}
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              order: { xs: 2, md: 1 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 3, sm: 5, md: 7 },
            }}
          >
            <Box component="form" sx={{ width: "100%", maxWidth: 420 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Sign In to Book Notes
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Log in to keep track of your books, notes, and reading
                    progress.
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <TextField
                    label="Username"
                    id="username"
                    name="username"
                    fullWidth
                    autoComplete="username"
                  />
                  <TextField
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember me"
                  />
                  <Link component="button" type="button" underline="hover">
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Log In
                </Button>

                <Divider>or sign in with</Divider>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookOutlinedIcon />}
                  >
                    Facebook
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<XIcon />}>
                    X
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                  >
                    Google
                  </Button>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link component={RouterLink} to="/register" underline="hover">
                    Create one
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AuthForm;
