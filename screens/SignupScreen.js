import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { useNavigation } from "@react-navigation/native";

function SignupScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  async function signUpHandler({ email, password }) {
    setIsLoading(true);
    try {
      await createUser(email, password);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("An error occurred!", error.message, [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating User" />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
