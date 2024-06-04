import { useContext } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { UserContext } from "../App";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
  }

  return (
    <header className="relative z-50">
      <nav className="flex items-center justify-between bg-darkGray py-4 px-8">
        <div className="flex flex-1 justify-start">
          <Logo width={80} height={40} />
        </div>
        <div>
          <div className="flex flex-1 justify-end">
            <h3 className="text-white">Group Chat</h3>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <p className="text-white">Hi, {user}!</p>
          <button className="bg-red-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-red-600" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
