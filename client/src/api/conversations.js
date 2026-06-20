import axios from "axios"


const BASE_URL = import.meta.env.VITE_API_URL;
export const getConversations =async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${BASE_URL}/api/conversations/`, {
    headers: {Authorization: `Bearer ${token}`}
  }) 
  return response.data;
}

export const postConversations = async (title, subjectId) => {
  const token = localStorage.getItem('token');
  const convoData = {title, subjectId};
  const response = await axios.post(`${BASE_URL}/api/conversations`, convoData, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response.data;
}