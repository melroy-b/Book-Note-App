import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
    <>
      <AuthForm
        CreateAccount={true}
        HeaderText={"Create an account"}
        BodyText={
          "Register to keep track of your books, notes, and reading progress."
        }
      />
    </>
  );
};

export default Register;
