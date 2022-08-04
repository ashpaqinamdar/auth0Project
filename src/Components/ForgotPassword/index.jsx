import React from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

function ForgotPassword({
  handleOnChange,
  handleSubmit,
  switchToForgotPassword,
  reqSuccess,
}) {
  return (
    <div>
      {reqSuccess ? (
        <>
          <div>A verification code has been sent to your email ID</div>{" "}
          <div
            className="forgotPassword"
            style={{ marginTop: "30px" }}
            onClick={switchToForgotPassword}
          >
            {`<< Go back`}
          </div>
        </>
      ) : (
        <>
          {" "}
          <CustomInput
            label={"Email address"}
            lableInputSpacing={10}
            onChange={handleOnChange}
            name="email"
          />
          <div className="loginTextFlex">
            <CustomButton text={"Send Code"} submit={handleSubmit} />
            <div
              onClick={switchToForgotPassword}
              style={{ textAlign: "center" }}
            >
              <div className="forgotPassword" onClick={switchToForgotPassword}>
                {`<< Go back`}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
