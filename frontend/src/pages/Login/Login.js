import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import "./login.css";

const Login = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginError = useSelector((state) => state.user.loginError);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [loggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(state.username, state.password));
  };

  return (
    <div id="login-page">
      <div className="login-container">
        <h1>Login</h1>
        {loginError ? (
          <p className="login-error">Incorrect Credentials</p>
        ) : null}
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
