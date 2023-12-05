import { useState } from "react";

const HabitInput = ({ text }: { text: string }) => {
  const [habitInput, setHabitInput] = useState("")
  return (
    <form className="flex my-6" onClick={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder={text}
        className="input input-bordered input-md w-full max-w-xs"
        value={habitInput}
        onChange={(e)=> setHabitInput(e.target.value)}
      />
      <button type="submit" className="btn ml-4">+</button>
    </form>
  );
};

export default HabitInput;
