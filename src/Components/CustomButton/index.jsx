import React from "react";
import Button from "@mui/material/Button";
import { Oval } from "react-loader-spinner";

function CustomButton({ text, submit, loader }) {
  return (
    <div>
      <Button variant="contained" onClick={submit}>
        {loader ? <Oval width={20} height={20} /> : text}
      </Button>
    </div>
  );
}

export default CustomButton;
