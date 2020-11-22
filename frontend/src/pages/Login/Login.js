import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./login.css";

const Login = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const history = useHistory();
  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-input">Username</label>
          <input
            type="text"
            id="username-input"
            value={state.username}
            onChange={(e) => {
              setState({ ...state, username: e.target.value });
            }}
          />
          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            id="password-input"
            value={state.password}
            onChange={(e) => {
              setState({ ...state, password: e.target.value });
            }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
