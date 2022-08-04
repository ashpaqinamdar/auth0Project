import auth0 from "auth0-js";

// Signup

// 1: User Verifies Otp (Saves auth ID)
// 2: Authorize Page open
// 3: Get token via hash
// 4: Call Sign up API
// 5: Check if Mobile Number Verified
// 6: YES? remove authEmail and authId and Call Manual Login
// 7: NO? NAVIGATE to Mobile Otp screen

// 8: User Verifies OTP
// 9: Authorize Mobile Page Open
// 10: Get token via hash
// 11: Call Verify Mobile OTP API
// 12: If AuthId Exists
// 13: YES? remove authEmail and authId and Call Manual Login
// 14 NO? Call login()

async function webAuth() {
  try {
    let settingURL = process.env.PUBLIC_URL + "/setting.json";
    const response = await fetch(settingURL);
    const data = await response.json();
    let webAuthConfig = new auth0.WebAuth({
      domain: data.REACT_APP_AUTH0_CUSTOM_DOMAIN,
      clientID: data.REACT_APP_AUTH0_CLIENT,
      responseType: "token id_token",
      scope: "offline_access openid",
      redirectUri: data.REACT_APP_REDIRECTION_SIGNIN_URL_AUTHORIZE,
    });
    return webAuthConfig;
  } catch (e) {
    console.error(e);
    // alert("Auth0 failed to initiate");
  }
}

async function webAuthMobile() {
  try {
    let settingURL = process.env.PUBLIC_URL + "/setting.json";
    const response = await fetch(settingURL);
    const data = await response.json();
    let webAuthConfig = new auth0.WebAuth({
      domain: data.REACT_APP_AUTH0_DOMAIN,
      clientID: data.REACT_APP_AUTH0_CLIENT,
      responseType: "token id_token",
      scope: "offline_access openid",
      redirectUri: data.REACT_APP_REDIRECTION_SIGNIN_URL_AUTHORIZE_MOBILE,
    });
    return webAuthConfig;
  } catch (e) {
    console.error(e);
    // alert("Auth0 failed to initiate");
  }
}

async function webAuthMobileEdit() {
  try {
    let settingURL = process.env.PUBLIC_URL + "/setting.json";
    const response = await fetch(settingURL);
    const data = await response.json();
    let webAuthConfig = new auth0.WebAuth({
      domain: data.REACT_APP_AUTH0_CUSTOM_DOMAIN,
      clientID: data.REACT_APP_AUTH0_CLIENT,
      responseType: "token id_token",
      scope: "offline_access openid",
      redirectUri: data.REACT_APP_REDIRECTION_SETTING_URL,
    });
    return webAuthConfig;
  } catch (e) {
    console.error(e);
    // alert("Auth0 failed to initiate");
  }
}

export const parseHash = () => {
  return new Promise(async (resolve, reject) => {
    const webAuth0 = await webAuth();
    webAuth0.parseHash({ hash: window.location.hash }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const otpStart = ({ email }) => {
  return new Promise(async (resolve, reject) => {
    const variables = { email, connection: "email", send: "code" };
    const webAuth0 = await webAuth();
    webAuth0.passwordlessStart(variables, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
export const otpMobileStart = ({ phone_number }) => {
  return new Promise(async (resolve, reject) => {
    const variables = { phone_number, connection: "sms", send: "code" };
    const webAuth0 = await webAuth();
    webAuth0.passwordlessStart(variables, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const otpLogin = ({ email, otp }) => {
  return new Promise(async (resolve, reject) => {
    const webAuth0 = await webAuth();
    webAuth0.passwordlessLogin(
      { email, connection: "email", verificationCode: otp },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const otpMobileLogin = (phone_number, otp) => {
  return new Promise(async (resolve, reject) => {
    const webAuth0 = await webAuthMobile();
    webAuth0.passwordlessLogin(
      { phoneNumber: phone_number, connection: "sms", verificationCode: otp },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
export const otpMobileEdit = (phone_number, otp) => {
  return new Promise(async (resolve, reject) => {
    const webAuth0 = await webAuthMobileEdit();
    webAuth0.passwordlessLogin(
      { phoneNumber: phone_number, connection: "sms", verificationCode: otp },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const otpEmailEdit = (email, otp) => {
  return new Promise(async (resolve, reject) => {
    const webAuth0 = await webAuthMobileEdit();
    webAuth0.passwordlessLogin(
      { email: email, connection: "email", verificationCode: otp },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const manualLogin = (params) => {
  return new Promise(async (resolve, reject) => {
    const webAuth0 = await webAuth();
    webAuth0.login(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const authWebLogout = async () => {
  try {
    const webAuth0 = await webAuth();
    webAuth0.logout();
  } catch (e) {
    console.log(e);
  }
};
