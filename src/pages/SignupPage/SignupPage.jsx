import { useState } from "react";
import { useNavigate } from "react-router";
import style from "./SignupPage.module.css";
import Input from "../../components/Input/Input";

function SignupPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  function addUser(e) {
    e.preventDefault();

    fetch(`${API_URL}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: "AUTHOR",
      }),
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert("Login:", data);
        navigate("/login");
      });
  }

  return (
    <form className={style.form}>
      <div className={style.wrapper}>
        <label htmlFor='username'>Username</label>
        <Input setState={setUsername} state={username} value='username'></Input>
      </div>
      <div className={style.wrapper}>
        <label htmlFor='email'>Email</label>

        <Input
          setState={setEmail}
          state={email}
          value='email'
          type='email'
        ></Input>
      </div>
      <div className={style.wrapper}>
        <label htmlFor='password'>Password</label>
        <Input
          setState={setPassword}
          state={password}
          value='password'
          type='password'
        ></Input>
      </div>
      <button onClick={addUser} type='submit'>
        Submit
      </button>
    </form>
  );
}

export default SignupPage;
