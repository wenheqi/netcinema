import React, { useState } from "react";
import axios from "axios";
import Navbar from "../elements/Navbar";
import Form from "../elements/Form";
import FormGroup from "../elements/FormGroup";
import Input from "../elements/Input";
import UIButton from "../elements/UIButton";
import Footer from "../elements/Footer";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (validatePassword(event.target.value)) {
      setIsValidPassword(true);
    }
  };

  const handlePasswordBlur = (event) => {
    setIsValidPassword(validatePassword(event.target.value));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/v1/users/signin", {
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
          localStorage.setItem("netcinema-user", result.token);
          window.location = "/";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="loginContainer">
      <Navbar onlyDisplayBrand={true} />
      <div className="loginFormContainer">
        <Form title="Sign In" method="post" handleSubmit={handleFormSubmit}>
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
            <div style={{ marginTop: "20px" }}>
              <UIButton type="submit" autoComplete="off" text="Sign In" />
            </div>
          </FormGroup>
          <FormGroup>
            <div className="loginRememberMe">
              <div>
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              <div>
                <a href="/loginhelp">Need Help?</a>
              </div>
            </div>
          </FormGroup>
        </Form>
        <div className="loginSignUpNowContainer">
          <div>
            New to NetCinema? <a href="/signup">Sign up now</a>.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
