import { authService } from "MyBase";
import { useState } from "react";
import "./AuthForm.css";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form className="auth-wrap" onSubmit={onSubmit}>
        <div className="auth-input-wrap">
          <input
            id="auth-input"
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            id="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
        </div>
        <span id="auth-toggle" onClick={toggleAccount}>
          {newAccount ? "로그인" : "계정이 없으신가요?"}
        </span>
        {error !== "" ? <h1 id="auth-error">{error}</h1> : null}
        <input
          id="auth-submitBtn"
          type="submit"
          value={newAccount ? "계정 만들기" : "로그인"}
        />
      </form>
    </>
  );
};

export default AuthForm;
