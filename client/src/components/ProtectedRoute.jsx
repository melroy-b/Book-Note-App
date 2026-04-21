import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isCheckingAuth, isAuthenticated } = useCheckAuthentication();

  if (isCheckingAuth) {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
