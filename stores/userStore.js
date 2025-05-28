import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../apis/user';

const useUserStore = create((set) => ({
  user: null,
  accessToken: null,

  fetchUser: async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) return;

    const profile = await userApi.Profile(token);
    set({ user: profile, accessToken: token });
  },
}));

export default useUserStore;