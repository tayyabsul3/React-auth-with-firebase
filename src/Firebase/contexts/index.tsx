import { ReactNode, useContext, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

const AuthContext = createContext(undefined);
export function useAuth() {
  return useContext(AuthContext);
}
interface AuthProviderProps {
  children: ReactNode; // Accepts any valid React children
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserloggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {
      setUser({ ...user });
      setUserloggedIn(true);
    } else {
      setUser(null);
      setUserloggedIn(false);
    }
    setLoading(false);
  }
  const value = {
    user,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
