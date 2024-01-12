import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Editor from "./components/Editor";
import JobPage from "./pages/JobPage";
import HomePage from "./pages/Home";
import EmployerSignup from "./pages/EmployerSignup";
import CandidateSignup from "./pages/CandidateSignup";
import LoginPage from "./pages/LoginPAge";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<HomePage />} />
              <Route path="editor" element={<Editor />} />
              <Route path="job-offer" element={<JobPage />} />
            </Route>
            <Route path="employer-signup" element={<EmployerSignup />} />
            <Route path="candidate-signup" element={<CandidateSignup />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
