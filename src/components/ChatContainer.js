import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import ChatBubble from "./ChatBubble";

const ChatContainer = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [queryCount, setQueryCount] = useState(10);
  const { user, chatContainerRef } = useContext(UserContext);
  const messageAppend = 5;

  const messagesRef = collection(db, "messages");

  const updateTotalMessagesCount = async () => {
    const messagesCount = await getCountFromServer(messagesRef);
    setTotalCount(messagesCount.data().count);
  };

  useEffect(() => {
    updateTotalMessagesCount();
    // eslint-disable-next-line
  }, [messages]);

  const fetchMessages = async (fetchLimit = queryCount) => {
    const q = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(fetchLimit)
    );
    onSnapshot(q, async (snapshot) => {
      const messageItems = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setMessages(messageItems);
    });
  };

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      await fetchMessages();
      await updateTotalMessagesCount();
    };

    init();
    setTimeout(() => {
      const container = chatContainerRef.current;
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line
  }, []);

  const loadMoreMessages = async () => {
    setQueryCount(queryCount + messageAppend);
    await fetchMessages(queryCount + messageAppend);
  };

  return (
    <div
      className="flex flex-col py-[40px] mt-[72px] px-4 h-[calc(100vh-132px)] overflow-auto overflow-anchor-none"
      ref={chatContainerRef}
    >
      {!loading && totalCount > messages.length && (
        <button
          className="bg-blue-500 flex mx-auto p-2 rounded-md text-white text-xs"
          onClick={loadMoreMessages}
        >
          See previous messages
        </button>
      )}
      {!loading && totalCount <= messages.length && (
        <p className="text-gray-500 my-4 text-sm">No more messages to show.</p>
      )}
      {messages
        ?.map((message) => (
          <ChatBubble key={message.id} user={user} message={message} />
        ))
        .reverse()}
    </div>
  );
};

export default ChatContainer;
