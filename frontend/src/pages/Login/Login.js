import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./login.css";

const Login = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginError = useSelector((state) => state.user.authError);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [loggedIn]);

  const submitHandler = (username, password) => {
    dispatch(login(username, password));
  };

  return (
    <div id="login-page">
      <AuthForm authError={loginError} submitHandler={submitHandler} />
    </div>
  );
};

export default Login;
