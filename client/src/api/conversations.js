import axios from "axios"

export const getConversations =async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/conversations/`, {
    headers: {Authorization: `Bearer ${token}`}
  }) 
  return response.data;
}