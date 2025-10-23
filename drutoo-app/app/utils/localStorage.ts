import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToLocalStorage = async (key: string, token: string) => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};