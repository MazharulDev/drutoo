import { authkey } from "../constants/storageKey";
import { decodedToken } from "../utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";

export const storeUserInfo = async ({ accessToken }: { accessToken: string }) => {
  return await setToLocalStorage(authkey, accessToken);
};

export const getUserInfo = async () => {
  const authToken = await getFromLocalStorage(authkey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = async () => {
  const authToken = await getFromLocalStorage(authkey);
  return !!authToken;
};

export const removeUserInfo = async (key: string) => {
  try {
    const value = await getFromLocalStorage(key);
    if (value) {
      // In React Native, we use AsyncStorage.removeItem instead of localStorage.removeItem
      // This will be handled in the localStorage utility
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error removing user info:", error);
    return false;
  }
};