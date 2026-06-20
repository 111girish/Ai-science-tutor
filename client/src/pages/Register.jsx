import { registerUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [registerData, setregisterData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setregisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(
        registerData.fullname,
        registerData.username,
        registerData.email,
        registerData.password,
      );
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <>
      <p>Login page</p>
      <input onChange={handleChange} placeholder="fullname" name="fullname" />
      <input onChange={handleChange} placeholder="username" name="username" />
      <input onChange={handleChange} placeholder="password" name="password" />
      <input onChange={handleChange} placeholder="email" name="email" />
      <button onClick={handleSubmit}>Login</button>
      {error && <p>{error}</p>}
    </>
  );
};

export default Login;
