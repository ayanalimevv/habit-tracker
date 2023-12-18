import React, { useState } from "react";
import FileInput from "./FileInput";

const Modal = ({
  id,
  topHeading,
  paragraphText,
  handleOnConfirm,
  btnColor,
  btnText,
  isTextArea,
  handleTextArea,
  textAreaText = "",
  isFileInput = false,
  onClickFirebaseFn,
  argsArray,
}: {
  id: string;
  topHeading: string;
  paragraphText: string;
  handleOnConfirm: () => void;
  btnColor: "error" | "accent";
  btnText: string;
  isTextArea: boolean;
  handleTextArea?: (text: string) => void;
  textAreaText?: string;
  isFileInput?: boolean;
  onClickFirebaseFn?: any;
  argsArray?: any;
}) => {
  const [textAreaValue, setTextAreaValue] = useState(textAreaText);
  const setTextArea = (e: any) => {
    if (!handleTextArea) return;
    setTextAreaValue(e.target.value);
    handleTextArea(e.target.value);
  };
  return (
    <dialog id={id} className="modal">
      <div className="modal-box flex flex-col justify-center">
        <h3 className="font-bold text-lg">{topHeading}</h3>
        <p className="py-4">{paragraphText}</p>
        {isTextArea && handleTextArea && (
          <textarea
            className="textarea textarea-bordered textarea-lg"
            placeholder={"Add a Note"}
            onChange={setTextArea}
            value={textAreaValue}
          ></textarea>
        )}
        {isFileInput && onClickFirebaseFn && (
          <FileInput
            onClickFirebaseFn={onClickFirebaseFn}
            argsArray={[...argsArray]}
          />
        )}
        <div className="modal-action flex justify-end">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-outline mr-2">Close</button>
            <button
              onClick={handleOnConfirm}
              className={`btn btn-${btnColor} btn-outline`}
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
