import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
export const loginUser =async (username, email, password) => {
  const Logindata = {user_name: username, email, password};
  try{
    const response = await axios.post(`${BASE_URL}/login`, Logindata);
    return response.data;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export const registerUser =async (fullname, username, email, password) => {
  const registerData = {full_name: fullname, user_name: username, email, password};
  try{
    const response =await axios.post(`${BASE_URL}/register`, registerData);
    return response.data;
  } catch(err){
    console.log(err);
    throw err;
  }
}