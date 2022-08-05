import createAuth0Client from "@auth0/auth0-spa-js";
import { saveAuthType } from "../utils/localStorage";
let auth0Client;

async function initClient() {
  try {
    let settingURL = process.env.PUBLIC_URL + "/setting.json";
    const response = await fetch(settingURL);
    const data = await response.json();
    if (!auth0Client) {
      auth0Client = await createAuth0Client({
        domain: data.REACT_APP_AUTH0_CUSTOM_DOMAIN,
        client_id: data.REACT_APP_AUTH0_CLIENT,
        redirect_uri: data.REACT_APP_REDIRECTION_SIGNIN_URL,
        useRefreshTokens: true,
        cacheLocation: "localstorage",
        scope: "offline_access openid",
        audience: `https://${data.REACT_APP_AUTH0_DOMAIN}/userinfo`,
      });
    }

    return auth0Client;
  } catch (e) {
    console.error(e);
    // alert("Auth0 failed to initiate");
  }
}
initClient().then();

export async function login(params) {
  const auth0 = await initClient();

  await auth0.loginWithRedirect(params);
}

export async function passwordlesslogin(params) {
  const auth0 = await initClient();

  await auth0.passwordlessStart(params);
}

export async function loginGoogle(params) {
  localStorage.clear();
  let settingURL = process.env.PUBLIC_URL + "/setting.json";
  const response = await fetch(settingURL);
  const data = await response.json();
  const auth0 = await initClient();
  saveAuthType("social");

  await auth0.loginWithRedirect({
    connection: "google-oauth2",
    redirect_uri: data.REACT_APP_REDIRECTION_SOCIAL_SIGNUP,
  });
}

export async function loginGoogleAuth(params) {
  localStorage.clear();
  let settingURL = process.env.PUBLIC_URL + "/setting.json";
  const response = await fetch(settingURL);
  const data = await response.json();
  const auth0 = await initClient();
  saveAuthType("social");
  localStorage.setItem("type", "login");
  await auth0.loginWithRedirect({
    connection: "google-oauth2",
    redirect_uri: data.REACT_APP_REDIRECTION_SIGNIN_URL_AUTHORIZE,
  });
}
export async function loginFacebook(params) {
  localStorage.clear();
  const auth0 = await initClient();
  saveAuthType("social");
  await auth0.loginWithRedirect({
    connection: "facebook",
  });
}

export async function loginApple(params) {
  localStorage.clear();
  const auth0 = await initClient();
  saveAuthType("social");
  sessionStorage.setItem("connection-type", "apple");
  await auth0.loginWithRedirect({
    connection: "apple",
  });
}

export async function handleCallback() {
  const auth0 = await initClient();
  return await auth0.handleRedirectCallback();
}

export async function getToken(params) {
  const auth0 = await initClient();
  let token;

  try {
    token = await auth0.getTokenSilently();
    return token;
  } catch (e) {
    console.log(e);
  }
}

export async function getUser(params) {
  const auth0 = await initClient();
  const user = await auth0.getUser();
  return user;
}

export async function logout() {
  let settingURL = process.env.PUBLIC_URL + "/setting.json";
  const response = await fetch(settingURL);
  const data = await response.json();
  const auth0 = await initClient();
  console.log("Logout Called");
  await auth0.logout({
    returnTo: data.REACT_APP_REDIRECTION_SIGNOUT_URL,
  });
}

export default {
  getToken,
  logout,
  login,
  handleCallback,
  getUser,
  loginApple,
  loginFacebook,
  loginGoogle,
};
