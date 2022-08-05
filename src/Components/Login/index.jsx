import React from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import google from "../../assets/images/google.png";

function LogIn({
  handleOnChange,
  handleSubmit,
  handleLoginGoogle,
  switchToForgotPassword,
}) {
  return (
    <>
      <CustomInput
        label={"Email Address"}
        lableInputSpacing={10}
        onChange={handleOnChange}
        name="email"
      />
      <CustomInput
        label={"Password"}
        lableInputSpacing={10}
        onChange={handleOnChange}
        name="password"
        type="password"
      />
      <div className="loginTextFlex">
        <CustomButton text={"Log In"} submit={handleSubmit} />
        <div onClick={switchToForgotPassword} style={{ textAlign: "center" }}>
          <div className="forgotPassword">Forget Password?</div>
        </div>
      </div>
      <div className="loginWithGoogle">
        <div onClick={() => handleLoginGoogle("LOGIN")}>
          Or login with Google
        </div>
        <img src={google} width={50} />
      </div>
    </>
  );
}

export default LogIn;
