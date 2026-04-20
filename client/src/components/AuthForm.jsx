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
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link as RouterLink } from "react-router-dom";
import BookLibrary from "../assets/book-library.jpg";

const API_URL = import.meta.env.VITE_API_URL;
const AuthForm = (props) => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  return (
    <Box>
      <Paper elevation={0}>
        <Grid container justifyContent={"center"}>
          <Grid
            // size={{ xs: 12, md: 6 }}
            sx={{
              //   order: { xs: 2, md: 1 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 3, sm: 5, md: 7 },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 420, minWidth: 420 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {props.HeaderText}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {props.BodyText}
                  </Typography>
                </Box>

                {/* local login form */}
                <Stack
                  component="form"
                  action={`${API_URL}/auth/${props.authType}`}
                  method="post"
                  spacing={3}
                >
                  <Stack spacing={2}>
                    <TextField
                      label={
                        props.CreateAccount ? "Username" : "Username or email"
                      }
                      id="form_username"
                      name="form_username"
                      fullWidth
                      autoComplete="username"
                      required
                    />
                    {props.CreateAccount && (
                      <TextField
                        label="Email"
                        id="form_email"
                        name="form_email"
                        fullWidth
                        autoComplete="email"
                        required
                      />
                    )}
                    <TextField
                      label="Password"
                      id="form_password"
                      name="form_password"
                      type="password"
                      fullWidth
                      autoComplete="current-password"
                      required
                    />
                  </Stack>

                  {!props.CreateAccount && (
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
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    {props.CreateAccount ? "Submit" : "Log In"}
                  </Button>
                </Stack>

                <Divider>
                  or sign {props.CreateAccount ? "up" : "in"} with
                </Divider>

                {/* Google and Apple OAuth login */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  justifyContent={"center"}
                >
                  <Button
                    variant="outlined"
                    onClick={handleGoogleLogin}
                    sx={{
                      minWidth: 50,
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      borderColor: "rgb(234, 67, 53)",
                      color: "rgb(234, 67, 53)",
                      ":hover": {
                        bgcolor: "rgb(234, 67, 53)",
                        color: "rgb(255, 255, 255)",
                      },
                    }}
                  >
                    <GoogleIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleGithubLogin}
                    sx={{
                      minWidth: 50,
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      borderColor: "rgb(0, 0, 0)",
                      color: "rgb(0, 0, 0)",
                      ":hover": {
                        bgcolor: "rgb(0, 0, 0)",
                        color: "rgb(255, 255, 255)",
                      },
                    }}
                  >
                    <GitHubIcon />
                  </Button>
                </Stack>

                {/* navigation for login / register */}
                {props.CreateAccount ? (
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login" underline="hover">
                      Sign In
                    </Link>
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{" "}
                    <Link
                      component={RouterLink}
                      to="/register"
                      underline="hover"
                    >
                      Create one
                    </Link>
                  </Typography>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AuthForm;
