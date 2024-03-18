import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
        setIsAuthenticated(true);
      }
    }
    getToken();
  }, []);

  function login(token) {
    setIsAuthenticated(true);
    setToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setToken(null);
    setIsAuthenticated(false);
    AsyncStorage.removeItem("token");
  }
  const values = { token, isAuthenticated, login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
