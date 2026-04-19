import { useParams, useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const info = searchParams.get("info");

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
      />
    </>
  );
};

export default Login;
