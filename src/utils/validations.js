const REGEX = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*^?&\.])[A-Za-z\d@#$!%*^?&\.]{8,15}$/,

  NAME: /^(?!\s)(?![\s\S]*\s$)[A-Za-z ]+$/,
};

export const validateEmail = (email) => {
  return REGEX.EMAIL.test(email);
};
export const passwordValidation = (password) => {
  return REGEX.PASSWORD.test(password);
};
export const validateValue = (val) => {
  return val.length >= 2;
};
export const validateName = (name) => {
  if (name.length < 2) {
    return false;
  }
  return REGEX.NAME.test(name);
};
