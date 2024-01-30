import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/Home";
import Editor from "./components/editor/Editor";
import JobPage from "./pages/JobPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/dashboard/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="editor" element={<Editor />} />
          <Route path="job-offer" element={<JobPage />} />
        </Route>
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<DashboardHome />} />
          <Route path="/dashboard/create" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
