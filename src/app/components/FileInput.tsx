import React, { useState } from "react";
import Button from "./Button";
import { uploadProfilePic } from "../helpers/firebaseFunctions";
import Image from "next/image";
import Loader from "./Loader";

const FileInput = ({
  onClickFirebaseFn,
  argsArray = [],
}: {
  onClickFirebaseFn: any;
  argsArray?: any;
}) => {
  const [value, setValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="my-4">
      {selectedFile && filePreview && (
        <Image
          alt={"Profile-Pic"}
          width={120}
          height={80}
          src={filePreview}
          layout="responsive"
          objectFit="cover" // or "contain", "fill", etc.
          objectPosition="center"
          className="my-4 rounded-lg"
        />
      )}
      <div className="label">
        <span className="label-text">Add a Image (Optional)</span>
      </div>
      <input
        alt="Upload Image"
        type="file"
        placeholder="Input Image!"
        className="file-input file-input-bordered w-full max-w-xs mr-2 hover:scale-[.99] bg-opacity-50"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={handleFileChange}
      />
      {
        <Button
          onClickFn={() => {
            onClickFirebaseFn(selectedFile, ...argsArray, setValue);
          }}
          disabled={!selectedFile || value > 0 || value === 100}
        >
          {value < 1 && "Upload Image"}
          {value > 0 && value < 100 && <Loader />}
          {value === 100 && "Uploaded"}
        </Button>
      }
    </div>
  );
};

export default FileInput;
