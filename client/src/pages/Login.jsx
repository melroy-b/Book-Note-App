import { useLocation, useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

/**
 * Renders the login page and preserves the return path after authentication.
 */
const Login = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const info = searchParams.get("info");
  const returnToFromState = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search}${location.state.from.hash}`
    : null;
  const returnTo = returnToFromState || searchParams.get("returnTo") || "/";

  // Choose helper text based on auth-related query parameters.
  const bodyText = () => {
    if (error == "invalid_credentials")
      return "Invalid username/email or password";
    else if (info == "user_already_exists")
      return "User already exists, Log in";
    else return "Log in and access your books, notes, and reading progress.";
  };

  return (
    <>
      <AuthForm
        authType={"login"}
        CreateAccount={false}
        HeaderText={"Sign In"}
        BodyText={bodyText()}
        returnTo={returnTo}
      />
    </>
  );
};

export default Login;
