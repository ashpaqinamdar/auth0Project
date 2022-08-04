import React, { useState } from "react";
import "./index.css";
import { manualLogin } from "../../Auth0/auth0";
import { loginGoogle } from "../../Auth0/auth0-spa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserExists } from "../../utils/firebase";
import {
  validateEmail,
  passwordValidation,
  validateName,
} from "../../utils/validations";
import LogIn from "../../Components/Login";
import SignUp from "../../Components/SignUp";
import ForgotPassword from "../../Components/ForgotPassword";
import auth0 from "auth0-js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signUpFormDataError, setSignUpFormDataError] = useState({
    isValidName: true,
    isValidLastname: true,
    isValidEmail: true,
    isValidPassword: true,
  });
  const [formError, setFormError] = useState({
    isEmailValid: true,
    isPasswordValid: true,
  });
  const [loader, setLoader] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleOnChange = (e) => {
    const FormData = { ...formData };
    const FormError = { ...formError };

    FormData[e.target.name] = e.target.value;
    setFormData(FormData);
    setFormError(FormError);
  };

  const handleSignUpOnChange = (e) => {
    let dataToSet = e.target.value;
    let data = { ...signUpFormData };
    data[e.target.name] = dataToSet;
    setSignUpFormData(data);
  };

  const handleSubmit = async () => {
    const FormData = { ...formData };
    const FormError = { ...formError };
    FormError.isEmailValid = validateEmail(FormData.email);
    FormError.isPasswordValid = passwordValidation(FormData.password);
    console.log("csd", FormError);
    if (!FormError.isEmailValid || !FormError.isPasswordValid) {
      toast.error("Please enter a valid email or password");
      return;
    }
    setFormData(FormData);
    setFormError(FormError);

    let user = await checkUserExists(formData.email);

    if (user === undefined) {
      toast.error("Incorrect email or password");
      return;
    }

    try {
      setLoader(true);
      localStorage.clear();
      localStorage.setItem("auth_mode", "manual");
      localStorage.setItem("type", "login");
      localStorage.setItem("authEmail", formData?.email);
      await manualLogin({
        connection: "Username-Password-Authentication",
        username: formData?.email,
        password: formData?.password,
        grant_type: "password",
      });
    } catch (err) {
      localStorage.removeItem("manual_mode");
      setLoader(false);
      if (err.description === "Wrong email or password.") {
        toast.error("Wrong email or password");
      } else {
        setLoader(false);
        toast.error("Wrong email or password");
      }
    }
  };

  const handleSignUpSubmit = async () => {
    const FormData = { ...signUpFormData };
    const FormError = { ...signUpFormDataError };
    FormError.isValidEmail = validateEmail(FormData.email);
    FormError.isValidPassword = passwordValidation(FormData.password);
    FormError.isValidName = validateName(FormData.firstName);
    FormError.isValidLastname = validateName(FormData.lastName);

    if (!FormError.isValidEmail) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!FormError.isValidLastname) {
      toast.error("Please enter a valid lastname");
      return;
    }
    if (!FormError.isValidName) {
      toast.error("Please enter a valid firstname");
      return;
    }
    if (!FormError.isValidPassword) {
      toast.error("Please enter a valid password");
      return;
    }

    let user = await checkUserExists(FormData.email);

    if (user !== undefined) {
      toast.error("User already exists");

      return;
    }

    localStorage.clear();
    let settingURL = process.env.PUBLIC_URL + "/setting.json";
    const response = await fetch(settingURL);
    const data = await response.json();
    var webAuth = new auth0.WebAuth({
      domain: data.REACT_APP_AUTH0_DOMAIN,
      clientID: data.REACT_APP_AUTH0_CLIENT,
    });

    webAuth.signup(
      {
        connection: "Username-Password-Authentication",
        email: FormData?.email,
        password: FormData?.password,
        username: FormData?.email,
        given_name: FormData?.firstName,
        family_name: FormData?.lastName,
        name: FormData?.firstName + " " + FormData?.lastName,
        email_verified: true,
        password_history: true,
      },
      async function (err, result) {
        if (err) {
          toast.error("User already exists");
        } else {
          localStorage.setItem("auth_mode", "manual");
          localStorage.setItem("firstName", FormData?.firstName);
          localStorage.setItem("lastName", FormData?.lastName);
          localStorage.setItem("authEmail", FormData?.email);

          await manualLogin({
            connection: "Username-Password-Authentication",
            username: FormData?.email,
            password: FormData?.password,
            client_id: data.REACT_APP_AUTH0_CLIENT,
            grant_type: "password",
          });
        }
      }
    );
  };
  const switchToForgotPassword = () => {
    setForgotPass(!forgotPass);
    setReqSuccess(false);
  };

  const authZeroResetPassword = async (email) => {
    const FormData = { ...formData };
    const FormError = { ...formError };
    FormError.isEmailValid = validateEmail(FormData.email);

    if (!FormError.isEmailValid) {
      toast.error("Please enter a valid email");
      return;
    }
    let user = await checkUserExists(FormData.email);

    if (user === undefined) {
      toast.error("User does not exists");

      return;
    }

    let settingURL = process.env.PUBLIC_URL + "/setting.json";
    const response = await fetch(settingURL);
    const data = await response.json();
    var webAuth = new auth0.WebAuth({
      domain: data.REACT_APP_AUTH0_CUSTOM_DOMAIN,
      clientID: data.REACT_APP_AUTH0_CLIENT,
      redirectUri: data.REACT_APP_FORGOT_PASSWORD_URL,
    });

    webAuth.changePassword(
      { connection: "Username-Password-Authentication", email: FormData.email },
      function (err, res) {
        if (err) {
          setLoader(false);
          console.log(err);
        } else {
          setReqSuccess(true);
          setLoader(false);
        }
      }
    );
  };

  const switchSignUp = () => {
    setSignUp(!signUp);
  };

  const handleLoginGoogle = () => {
    loginGoogle();
  };
  return (
    <div className="backgroundImage">
      <ToastContainer position="bottom-right" />;
      <div className="mainLayout">
        {!forgotPass && (
          <div className="signUpText" onClick={switchSignUp}>
            {signUp ? (
              <div>Already have an account?</div>
            ) : (
              <div>Need an account?</div>
            )}
            <span style={{ marginLeft: "5px" }}>
              {signUp ? "Log In" : "Sign Up now"}
            </span>
          </div>
        )}

        {!forgotPass && !signUp ? (
          <LogIn
            handleOnChange={handleOnChange}
            handleSubmit={handleSubmit}
            handleLoginGoogle={handleLoginGoogle}
            switchToForgotPassword={switchToForgotPassword}
          />
        ) : signUp ? (
          <SignUp
            handleSubmit={handleSignUpSubmit}
            handleOnChange={handleSignUpOnChange}
          />
        ) : (
          <ForgotPassword
            handleOnChange={handleOnChange}
            handleSubmit={authZeroResetPassword}
            switchToForgotPassword={switchToForgotPassword}
            reqSuccess={reqSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
