import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

/**
 * Guards nested routes and redirects unauthenticated users to login.
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const { isCheckingAuth, isAuthenticated, userAuth } =
    useCheckAuthentication();

  if (isCheckingAuth) {
    // Keep protected content hidden while the session check is in progress.
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
    // Preserve the attempted page so login can send the user back afterward.
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Navigate
        to={`/login?returnTo=${encodeURIComponent(returnTo)}`}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet context={{ userAuth }} />;
};

export default ProtectedRoute;
