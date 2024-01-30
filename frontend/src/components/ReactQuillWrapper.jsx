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
  ];

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div className="mx-auto w-[100%] max-w-2xl h-[498px] p-4 bg-white rounded-md backdrop-blur-md">
      <ReactQuill
        className="h-[400px] w-full"
        value={text}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </div>
  );
};

export default ReactQuillWrapper;
