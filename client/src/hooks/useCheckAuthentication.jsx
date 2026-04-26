import { useState, useEffect } from "react";

export const useCheckAuthentication = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
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
