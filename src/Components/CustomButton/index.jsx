import React from "react";
import Button from "@mui/material/Button";

function CustomButton({ text, submit }) {
  return (
    <div>
      <Button variant="contained" onClick={submit}>
        {text}
      </Button>
    </div>
  );
}

export default CustomButton;
