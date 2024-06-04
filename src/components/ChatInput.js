import EmojiPicker from "emoji-picker-react";
import { ReactComponent as EmojiIcon } from "../assets/emoji-icon.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../App";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const { user, chatContainerRef } = useContext(UserContext);

  const emojiRef = useRef();
  const inputRef = useRef(null);

  const messagesDb = collection(db, "messages");

  useEffect(() => {
    // close emoji pop up when clicked outside
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const onEmojiClick = (emojis) => {
    const { value } = inputRef.current;
    const text = value + emojis.emoji;
    setMessage(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      message,
      createdAt: new Date().toLocaleString(),
      user,
    };

    try {
      await addDoc(messagesDb, data);
      setMessage("");
      const container = chatContainerRef.current;
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } catch (e) {
      console.log("Log: error", e);
    }
  };

  return (
    <div className="bg-white absolute inset-x-0 bottom-0 z-50 p-2 border-t border-gray-500">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-1">
          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here"
            className="flex flex-1 border border-gray-500 rounded-md p-2 resize-none"
            type="text"
            ref={inputRef}
          />
          <div className="relative ml-3" ref={emojiRef}>
            <button
              className="border rounded-md border-gray-500 p-2 text-darkGray"
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              type="button"
            >
              <EmojiIcon width={24} height={24} className="" />
            </button>
            <EmojiPicker
              open={emojiPickerOpen}
              className="!absolute bottom-[130%] left-[-50px] translate-x-[-50%]"
              onEmojiClick={onEmojiClick}
              autoFocusSearch={false}
            />
          </div>
          <button className="flex bg-darkGray text-white rounded-md px-8 py-2 ml-3">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
