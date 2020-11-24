import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup, authError } from "../../actions/userActions";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./signup.css";

const Signup = (props) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const signupError = useSelector((state) => state.user.authError);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [loggedIn]);

  const submitHandler = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      dispatch(authError("Passwords do not match"));
      return;
    }
    dispatch(signup(username, password));
  };

  return (
    <div id="login-page">
      <AuthForm
        authError={signupError}
        submitHandler={submitHandler}
        isSignup={true}
      />
    </div>
  );
};

export default Signup;
