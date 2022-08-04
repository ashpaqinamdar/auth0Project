const AUTH_TYPE = "authType";
const PROFILE = "profile";
let AUTH0_KEY;

if (window.location.host === "localhost:3000") {
  AUTH0_KEY = process.env.REACT_APP_AUTH0_TOKEN_KEY;
}

export const saveAuthType = (res) => {
  try {
    localStorage.setItem(AUTH_TYPE, res);
  } catch (err) {
    console.log(err);
  }
};

export const getAuthType = () => {
  let res = localStorage.getItem(AUTH_TYPE);
  return res;
};

export const getAuth0Token = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH0_KEY));
  } catch (err) {
    return "";
  }
};

export const retrieveToken = () => {
  let token = JSON.parse(localStorage.getItem(AUTH0_KEY));
  let idAuthToken = token?.body?.id_token
    ? token?.body?.id_token
    : token?.body?.idToken;
  return idAuthToken == null || idAuthToken === "" ? "" : idAuthToken;
};

export const saveProfile = (profile) => {
  try {
    const serializedProfile = JSON.stringify(profile);
    localStorage.setItem(PROFILE, serializedProfile);
  } catch (err) {
    //log this
  }
};

export const getProfile = () => {
  try {
    const serializedProfile = localStorage.getItem(PROFILE);

    if (serializedProfile === null) {
      return undefined;
    }

    return JSON.parse(serializedProfile);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
