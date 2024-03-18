import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(token) {
    setIsAuthenticated(true);
    setToken(token);
  }

  function logout() {
    setToken(null);
    setIsAuthenticated(false);
  }
  const values = { token, isAuthenticated, login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
