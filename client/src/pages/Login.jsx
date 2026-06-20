import { loginUser } from "../api/auth.js";

const Login = () => {
  const [loginData, setLoginData] = useState({username: "", email:"", password: ""});
  
  return (
    <>
      <p>Login page</p>
      <input onChange={handleChange} placeholder="username"/>
      <input placeholder="password" />
      <input type="submit" />
    </>
  );
};

export default Login;
