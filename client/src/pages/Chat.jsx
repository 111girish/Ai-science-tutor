import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages, postMessages } from "../api/messages.js";

const Chat = () => {
  const { convoId } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getChat = async () => {
    try {
      const response = await getMessages(convoId);
      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChat();
  }, []);

  const handleSubmit = async () => {
    await postMessages(convoId, inputMessage);
    await getChat();
    setInputMessage("");
  };

  return (
    <>
      <p>Chat page</p>
      {messages.map((message) => (
        <div
          key={message.message_id}
          style={{ textAlign: message.sender === "user" ? "right" : "left" }}
        >
          {message.content}
        </div>
      ))}
      <div>
        <input
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          placeholder="Enter Message"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Chat;
