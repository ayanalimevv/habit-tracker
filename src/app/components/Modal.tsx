import React from "react";

const Modal = ({
  id,
  topHeading,
  paragraphText,
  handleOnConfirm,
  btnColor,
  btnText,
  isTextArea,
  handleSetNote,
}: {
  id: string;
  topHeading: string;
  paragraphText: string;
  handleOnConfirm: () => void;
  btnColor: "error" | "accent";
  btnText: string;
  isTextArea: boolean;
  handleSetNote?: (text: string) => void;
}) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{topHeading}</h3>
        <p className="py-4">{paragraphText}</p>
        {isTextArea && handleSetNote && (
          <textarea
            className="textarea textarea-bordered textarea-lg"
            placeholder="Add a Note"
            onChange={(e) => handleSetNote(e.target.value)}
          ></textarea>
        )}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button type="button" className="btn btn-outline mr-2">Close</button>
            <button
              onClick={handleOnConfirm}
              className={`btn btn-${btnColor} btn-outline`}
              type="button"
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
