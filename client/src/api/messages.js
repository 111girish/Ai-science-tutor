import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getMessages = async (convoId) => {
  const token = localStorage.getItem("token");
  const result =await  axios.get(`${BASE_URL}/conversations/${convoId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const postMessages = async (convoId, userMessage) => {
  const token = localStorage.getItem("token");
  const messageData = {userMessage};
  const result =await axios.post(
    `${BASE_URL}/conversations/${convoId}/messages`,
    messageData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return result.data;
};
