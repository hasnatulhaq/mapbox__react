import ls from "localstorage-slim";

const setToken = ({ accessToken, refreshToken }) => {
  return ls.set("user", { accessToken, refreshToken });
};
 
const getToken = () => {
  try {
    const token = ls.get("user");
    if (token.accessToken && token.refreshToken)
      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    return false;
  } catch (error) {
    return false;
  }
};

const removeToken = () => {
  const r = ls.remove("user"); // returns undefined if exists and removed or else false
  if (r === undefined) {
    return true;
  }
  return r;
};

const TokenService = {
  setToken,
  removeToken,
  getToken,
};

export default TokenService;
