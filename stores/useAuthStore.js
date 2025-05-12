// stores/userStore.js
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create((set) => ({
  userToken: null,
  setUserToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    } else {
      await AsyncStorage.removeItem('userToken');
    }
    set({ userToken: token });
  },
  loadUserFromStorage: async () => {
    const token = await AsyncStorage.getItem('userToken');
    set({ userToken: token });
  },
}));
