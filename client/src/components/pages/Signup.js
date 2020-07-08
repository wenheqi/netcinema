import React, { useState } from "react";
import axios from "axios";
import Navbar from "../elements/Navbar";
import Form from "../elements/Form";
import FormGroup from "../elements/FormGroup";
import Input from "../elements/Input";
import UIButton from "../elements/UIButton";
import Footer from "../elements/Footer";

import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [secPassword, setSecPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [signupErrMsg, setSignupErrMsg] = useState("");

  const validateEmail = (email) => {
    if (/\S+@\S+\.\S+/.test(email)) {
      return true;
    }
    return false;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setIsValidEmail(true);
    }
  };

  const handleEmailBlur = (event) => {
    setIsValidEmail(validateEmail(event.target.value));
  };

  const validatePassword = (pwd) => {
    if (/^\S{6,60}$/.test(pwd)) {
      return true;
    }
    return false;
  };

  const validateSamePassword = (secPwd) => {
    return password === secPwd;
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (validatePassword(event.target.value)) {
      setIsValidPassword(true);
    }
  };

  const handlePasswordBlur = (event) => {
    setIsValidPassword(validatePassword(event.target.value));
  };

  const handleSecondPasswordChange = (event) => {
    setSecPassword(event.target.value);
    if (validateSamePassword(event.target.value)) {
      setIsSamePassword(true);
      return;
    }
    setIsSamePassword(false);
  };

  const handleSecondPasswordBlur = (event) => {
    setIsSamePassword(validateSamePassword(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/v1/users/signup", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          setSignupErrMsg("");
          localStorage.setItem("nc-token", result.token);
          window.location = "/";
        } else {
          setSignupErrMsg(result.error);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signupContainer">
      <Navbar onlyDisplayBrand={true} />
      <div className="signupFormContainer">
        <Form title="Sign Up" method="post" handleSubmit={handleFormSubmit}>
          <FormGroup>
            <Input
              type="email"
              label="Email"
              autoComplete="email"
              value={email}
              handleChange={handleEmailChange}
              handleBlur={handleEmailBlur}
              isValidInput={isValidEmail}
              errMsg="Please enter a valid email."
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              label="Password"
              autoComplete="password"
              value={password}
              handleChange={handlePasswordChange}
              handleBlur={handlePasswordBlur}
              isValidInput={isValidPassword}
              errMsg="Your password must contain between 6 and 60 characters."
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              label="Password"
              autoComplete="password"
              value={secPassword}
              handleChange={handleSecondPasswordChange}
              handleBlur={handleSecondPasswordBlur}
              isValidInput={isSamePassword}
              errMsg="Your entered passwords should be the same."
            />
          </FormGroup>
          <FormGroup>
            <div
              className={
                "signupErrMsgContainer" +
                (signupErrMsg.length > 0 ? " hasError" : " hasNoError")
              }
            >
              {signupErrMsg}
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <UIButton type="submit" autoComplete="off" text="Sign Up" />
            </div>
          </FormGroup>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
