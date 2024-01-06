import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/**
 *
 * @param {{
 * text: string, setText: React.Dispatch<React.SetStateAction<string>>;}} props
 * @returns
 */
const ReactQuillWrapper = ({ text, setText }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
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
  ];

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div className="mx-auto w-[80%] max-w-2xl bg-slate-400 h-[498px] p-4 rounded-md">
      <ReactQuill
        className="h-[400px]"
        value={text}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </div>
  );
};

export default ReactQuillWrapper;
