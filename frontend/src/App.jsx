import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Editor from "./components/Editor";
import JobPage from "./pages/JobPage";
import HomePage from "./pages/Home";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="editor" element={<Editor />} />
            <Route path="job-offer" element={<JobPage />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
