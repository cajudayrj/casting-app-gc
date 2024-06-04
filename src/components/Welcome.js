import { useContext, useState } from "react";
import { UserContext } from "../App";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Welcome = () => {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleUserEnter = () => {
    setShowError(false);
    if (name !== "") {
      setUser(name);
      localStorage.setItem("user", name)
    } else {
      setShowError(true);
    }
  };


  return (
    <div className="h-screen bg-darkGray text-white flex flex-col items-center justify-center p-6">
      <Logo />
      <h3 className="mt-4">Welcome to the group chat!</h3>
      <p className="mt-4">Please enter your name:</p>
      <input
        placeholder="John Doe"
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded-md mt-2 text-darkGray"
      />
      <button
        className="text-md rounded-md mt-4 px-4 py-2 text-white bg-blue-500"
        onClick={handleUserEnter}
      >
        Enter
      </button>
      {showError && (
        <p className="text-red-600 mt-4">
          Your name is required to enter the group chat.
        </p>
      )}
    </div>
  );
};

export default Welcome;
