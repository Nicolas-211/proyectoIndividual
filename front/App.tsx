import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";

function Main() {
  const { token } = useAuth();

  if (!token) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
