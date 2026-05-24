import { useState, useEffect } from "react";

/**
 * Checks the current session and returns auth status plus the logged-in user.
 */
export const useCheckAuthentication = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    // Ask the API whether the browser already has a valid session cookie.
    const checkUserAuthentication = async () => {
      try {
        const user = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: "include",
        });

        if (user.ok) {
          setIsAuthenticated(true);
          setUserAuth(await user.json());
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUserAuthentication();
  }, [setIsAuthenticated]);

  return {isCheckingAuth, setIsAuthenticated, isAuthenticated, userAuth};
};
