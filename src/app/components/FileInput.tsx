import React, { useState } from "react";
import Button from "./Button";
import { uploadProfilePic } from "../helpers/firebaseFunctions";

const FileInput = ({
  onClickFirebaseFn,
  argsArray = [],
}: {
  onClickFirebaseFn: any;
  argsArray?: any;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <>
      {" "}
      <input
        type="file"
        placeholder="Input Image!"
        className="file-input file-input-bordered w-full max-w-xs mr-2 hover:scale-[.99] bg-opacity-50"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={handleFileChange}
      />
      <Button
        onClickFn={() => {
          onClickFirebaseFn(selectedFile, ...argsArray);
        }}
      >
        Upload File
      </Button>
    </>
  );
};

export default FileInput;
