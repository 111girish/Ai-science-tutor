import { registerUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await registerUser(
        registerData.fullname,
        registerData.username,
        registerData.email,
        registerData.password,
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Check your credentials.");
    }
  };

  return (
    <>
      <p>Register page</p>
      <input onChange={handleChange} placeholder="fullname" name="fullname" />
      <input onChange={handleChange} placeholder="username" name="username" />
      <input onChange={handleChange} placeholder="password" type="password" name="password" />
      <input onChange={handleChange} placeholder="email" type="email" name="email" />
      <button onClick={handleSubmit}>Register</button>
      {error && <p>{error}</p>}
    </>
  );
};

export default Register;
