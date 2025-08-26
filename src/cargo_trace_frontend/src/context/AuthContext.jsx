import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, getPrincipal, login as doLogin, logout as doLogout } from "../auth";
import { backendService } from "../services/backendService";
import { Principal } from "@dfinity/principal";
import { cargo_trace_backend as backend } from "../../../declarations/cargo_trace_backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [globalPrincipal, setGlobalPrincipal] = useState(
    () => localStorage.getItem("principal") || null
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [backendStatus, setBackendStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Persist principal in localStorage
  useEffect(() => {
    if (globalPrincipal) {
      localStorage.setItem("principal", globalPrincipal);
    } else {
      localStorage.removeItem("principal");
    }
  }, [globalPrincipal]);

  // Initialize backend after successful login
  const initBackend = async (principalStr) => {
    try {
      setBackendStatus("Initializing backend...");
      const authClient = await import("@dfinity/auth-client").then((m) =>
        m.AuthClient.create()
      );
      const identity = authClient.getIdentity();

      await backendService.initialize(identity);

      const userPrincipal = Principal.fromText(principalStr);
      await backend.save_principal(userPrincipal);

      setBackendStatus("Backend connected successfully");
    } catch (err) {
      console.error("Backend init failed:", err);
      setBackendStatus("Backend connection failed");
    }
  };

  // On first load, check if already logged in
  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await checkAuth();
        setLoggedIn(authenticated);

        if (authenticated) {
          let userPrincipalStr = globalPrincipal;

          if (!userPrincipalStr) {
            userPrincipalStr = await getPrincipal();
            setGlobalPrincipal(userPrincipalStr);
          }

          await initBackend(userPrincipalStr);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Wrapped login
  const login = async () => {
    await doLogin(async () => {
      const authenticated = await checkAuth();
      if (authenticated) {
        const userPrincipalStr = await getPrincipal();
        setGlobalPrincipal(userPrincipalStr);
        setLoggedIn(true);

        await initBackend(userPrincipalStr);
      }
    });
  };

  // Wrapped logout
  const logout = async () => {
    await doLogout();
    setGlobalPrincipal(null);
    setLoggedIn(false);
    setBackendStatus("");
  };

  return (
    <AuthContext.Provider
      value={{
        globalPrincipal,
        setGlobalPrincipal,
        loggedIn,
        backendStatus,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
