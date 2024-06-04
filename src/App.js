import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import ChatContainer from "./components/ChatContainer";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState("");
  const chatContainerRef = useRef();

  useEffect(() => {
    const existingUser = localStorage.getItem("user");

    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, chatContainerRef }}>
        {user !== "" ? (
          <>
            <Header />
            <ChatContainer />
            <ChatInput />
          </>
        ) : (
          <Welcome />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
