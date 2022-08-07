import React from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import google from "../../assets/images/google.png";
import Button from "@mui/material/Button";
import { Grid } from "react-loader-spinner";

function SignUp({
  handleOnChange,
  handleSubmit,
  handleLoginGoogle,
  signUpFormData,
  isSocial,
  goToHome,
  handleSocialSignUp,
  loader,
}) {
  return (
    <>
      {loader && isSocial ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div>
          <CustomInput
            label={"First Name"}
            lableInputSpacing={10}
            onChange={handleOnChange}
            name="firstName"
            value={signUpFormData.firstName}
          />
          <CustomInput
            label={"Last Name"}
            lableInputSpacing={10}
            onChange={handleOnChange}
            name="lastName"
            value={signUpFormData.lastName}
          />
          <CustomInput
            label={"Email"}
            lableInputSpacing={10}
            onChange={handleOnChange}
            name="email"
            value={signUpFormData.email}
            isSocial={isSocial}
          />
          {!isSocial && (
            <CustomInput
              label={"Password"}
              type="password"
              lableInputSpacing={10}
              onChange={handleOnChange}
              name="password"
            />
          )}

          <div style={{ display: "flex" }}>
            <CustomButton
              text={isSocial ? "Complete Sign Up" : "Sign Up"}
              submit={isSocial ? handleSocialSignUp : handleSubmit}
              loader={loader}
            />
            {isSocial && (
              <Button
                variant="contained"
                className="cancelButton"
                onClick={goToHome}
              >
                Cancel
              </Button>
            )}
          </div>

          {!isSocial && (
            <div className="loginWithGoogle">
              Or SignUp with Google
              <div
                onClick={() => handleLoginGoogle()}
                style={{ marginTop: "20px" }}
              >
                <img src={google} width={50} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SignUp;
