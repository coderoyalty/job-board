import React from "react";
import ReactQuillWrapper from "./ReactQuillWrapper";

export default function () {
  const [text, setText] = React.useState("");
  return (
    <>
      <h1 className="text-3xl font-semibold py-4 text-center">
        Quill React Editor
      </h1>
      <ReactQuillWrapper {...{ text, setText }} />
    </>
  );
}
