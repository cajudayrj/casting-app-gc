import { ReactComponent as UserIcon } from "../assets/user-icon.svg";

const ChatBubble = ({ user, message }) => {
  return (
    <div
      className={`flex flex-col  mb-4 ${
        user === message.user ? "items-end" : "items-start"
      }`}
      key={message.id}
    >
      <p className="text-sm mx-[48px] mb-2">{message?.user}</p>
      <div
        className={`flex ${
          user === message.user ? "flex-row-reverse" : "flex-row"
        } items-end gap-2`}
      >
        <UserIcon width={40} height={40} />
        <div
          className={`text-white ${
            user === message.user ? "bg-darkGray" : "bg-gray-500"
          } rounded p-4 whitespace-pre-line`}
          dangerouslySetInnerHTML={{ __html: message.message }}
        />
      </div>
      <p className="text-gray-500 mx-[48px] text-[10px] mt-2">
        {message?.createdAt}
      </p>
    </div>
  );
};

export default ChatBubble;
