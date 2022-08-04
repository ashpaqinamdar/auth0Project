import React from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

function SignUp({ handleOnChange, handleSubmit }) {
  return (
    <div>
      <CustomInput
        label={"First Name"}
        lableInputSpacing={10}
        onChange={handleOnChange}
        name="firstName"
      />
      <CustomInput
        label={"Last Name"}
        lableInputSpacing={10}
        onChange={handleOnChange}
        name="lastName"
      />
      <CustomInput
        label={"Email"}
        lableInputSpacing={10}
        onChange={handleOnChange}
        name="email"
      />
      <CustomInput
        label={"Password"}
        type="password"
        lableInputSpacing={10}
        onChange={handleOnChange}
        name="password"
      />
      <CustomButton text={"Sign Up"} submit={handleSubmit} />
    </div>
  );
}

export default SignUp;
