import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

/**
 * Renders the registration page and keeps the intended post-auth redirect.
 */
const Register = () => {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  return (
    <>
      <AuthForm
        authType={"register"}
        CreateAccount={true}
        HeaderText={"Create an account"}
        BodyText={
          "Register to keep track of your books, notes, and reading progress."
        }
        returnTo={returnTo}
      />
    </>
  );
};

export default Register;
