import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../context/authContext";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const { login: loginContext } = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await login(email, password);
      loginContext(token);
    } catch (error) {
      Alert.alert("An error occurred!", error.message, [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Loging In...." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
