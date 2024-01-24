import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
