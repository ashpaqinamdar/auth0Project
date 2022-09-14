/** @format */

import React from "react";
import InputBase from "@mui/material/InputBase";
import "./index.css";
// import { numberWithCommas } from "../../utils/validations";
// import { InputAdornment } from "@material-ui/core";

function CustomInput({
  error,
  errorMessage,
  label,
  value,
  autoComplete,
  onChange,
  placeholder,
  inputProps,
  type,
  width,
  labelIcon,
  lableInputSpacing,
  labelSize,
  name,
  disabled,
  isSocial,
}) {
  return (
    <>
      {label && (
        <div
          className="customInputNewLabel"
          style={{
            marginBottom: lableInputSpacing ? lableInputSpacing : " 25px",
            fontSize: labelSize ? labelSize : 20,
          }}
        >
          <img src={labelIcon ? labelIcon : ""} />
          {label}
        </div>
      )}

      <div
        style={{ position: "relative" }}
        className={disabled ? "customInputNewDisabled" : ""}
      >
        <InputBase
          name={name}
          className={
            error
              ? "customInputNew customInputNewError mb-30"
              : "customInputNew mb-30"
          }
          value={value}
          autoComplete={autoComplete ? autoComplete : ""}
          onChange={onChange}
          placeholder={placeholder ? placeholder : ""}
          style={{ width: width ? width : "" }}
          type={type}
          disabled={isSocial ? true : false}
        />
        {error && (
          <div className="customInputNewErrorMessage">
            {errorMessage ? errorMessage : ""}
          </div>
        )}
      </div>
    </>
  );
}

export default CustomInput;
