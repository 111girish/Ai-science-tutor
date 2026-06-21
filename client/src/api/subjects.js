import axios from "axios";

export const getSubjects = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/subjects`, {
    headers: {Authorization: `Bearer ${token}`}});
  return response.data;
}