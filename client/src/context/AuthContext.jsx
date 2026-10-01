import { createContext, useContext, useState, useEffect, use } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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
          setUserAuth(await user.json());
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUserAuthentication();
  }, [setIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isCheckingAuth, isAuthenticated, userAuth, setUserAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  console.log("AuthContext state:", context); // Debugging line

  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");

  return context;
};
