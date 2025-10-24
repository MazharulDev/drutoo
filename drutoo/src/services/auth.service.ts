import { authKey } from "../constants/storageKey";
import { decodedToken } from "../utils/jwt";
import {
  getFromAsyncStorage,
  removeFromAsyncStorage,
  setToAsyncStorage,
} from "../utils/localStorage";

export const storeUserInfo = async (accessToken: string) => {
  return await setToAsyncStorage(authKey, accessToken);
};

export const getUserInfo = async () => {
  const authToken = await getFromAsyncStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return decodedData;
  } else {
    return null;
  }
};

export const isLoggedIn = async () => {
  const authToken = await getFromAsyncStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = async () => {
  return await removeFromAsyncStorage(authKey);
};
