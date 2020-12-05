import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./authForm.css";

const AuthForm = ({
  submitHandler,
  isSignup = false,
  authError,
  linkName,
  link,
}) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      submitHandler(state.username, state.password, state.confirmPassword);
    } else {
      submitHandler(state.username, state.password);
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      {authError ? <p className="auth-error">{authError}</p> : null}
      <form onSubmit={onSubmit}>
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
        {isSignup ? (
          <React.Fragment>
            <label htmlFor="confirm-password-input">Confirm Password</label>
            <input
              type="password"
              id="confirm-password-input"
              value={state.confirmPassword}
              onChange={(e) => {
                setState({ ...state, confirmPassword: e.target.value });
              }}
            />
          </React.Fragment>
        ) : null}

        <button className={isSignup ? "btn-signup" : "btn-login"} type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {link ? (
          <Link
            to={link}
            className={
              (isSignup ? "authForm-link-login" : "authForm-link-signup") +
              " authForm-link"
            }
          >
            {linkName}
          </Link>
        ) : null}
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  isSignup: PropTypes.bool,
  authError: PropTypes.string,
  link: PropTypes.string,
  linkName: PropTypes.string,
};

export default AuthForm;
