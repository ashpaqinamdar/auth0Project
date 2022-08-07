import React from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import google from "../../assets/images/google.png";

function LogIn({
  handleOnChange,
  handleSubmit,
  handleLoginGoogle,
  switchToForgotPassword,
  loader,
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
        <CustomButton text={"Log In"} submit={handleSubmit} loader={loader} />
        <div onClick={switchToForgotPassword} style={{ textAlign: "center" }}>
          <div className="forgotPassword">Forget Password?</div>
        </div>
      </div>
      <div className="loginWithGoogle">
        Or login with Google
        <div onClick={() => handleLoginGoogle("LOGIN")}>
          <img
            src={google}
            width={50}
            style={{ cursor: "pointer", marginTop: "10px" }}
          />
        </div>
      </div>
    </>
  );
}

export default LogIn;
