import React, { useState } from "react";
import { Button, ChakraProvider, Text } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class ReactQuillWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
    (this.modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    }),
      (this.formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
      ]);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    console.log(this.state.text);
    return (
      <div className="mx-auto w-[80%] max-w-2xl">
        <ReactQuill
          className="h-[412px]"
          value={this.state.text}
          modules={this.modules}
          formats={this.formats}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <h1 className="text-3xl font-semibold py-4">Quill React Editor</h1>
      <ReactQuillWrapper />
    </div>
  );
}

export default App;
