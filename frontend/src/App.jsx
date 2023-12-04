import React, { useState } from "react";
import { Button, ChakraProvider, Text } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactQuillWrapper from "./components/ReactQuillWrapper";
import Layout from "./Layout";
import Editor from "./components/Editor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="editor" element={<Editor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
