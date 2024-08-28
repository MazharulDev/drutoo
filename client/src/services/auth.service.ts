import { authkey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authkey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authkey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authkey);
  const decodedData = authToken ? decodedToken(authToken) : null;
  if (decodedData) {
    const exp = (decodedData as { exp: number })?.exp * 1000;
    const currentTime = new Date().getTime();
    if (currentTime > exp) {
      removeUserInfo(authkey);
    }
  }
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
