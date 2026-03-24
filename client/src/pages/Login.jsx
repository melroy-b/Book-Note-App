import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <>
      <AuthForm
        CreateAccount={false}
        HeaderText={"Sign In"}
        BodyText={"Log in and access your books, notes, and reading progress."}
      />
    </>
  );
};

export default Login;
