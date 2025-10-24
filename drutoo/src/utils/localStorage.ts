import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToAsyncStorage = async (key: string, token: string) => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const getFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

export const removeFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};
