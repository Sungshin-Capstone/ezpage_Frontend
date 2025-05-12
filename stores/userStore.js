import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'user_info';

export const useUserStore = create((set) => ({
  user: {
    name: '',
    nickname: '',
    userId: '',
    email: '',
    password: '', // Zustand에는 남아있지만 저장은 안 함
    country: '',
  },

  setUser: async (userInfo) => {
    // 저장할 데이터: 비밀번호 빼고 저장
    const { password, ...userWithoutPassword } = userInfo;

    set({ user: { ...userInfo } });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('AsyncStorage 저장 실패', error);
    }
  },

  resetUser: async () => {
    const emptyUser = {
      name: '',
      nickname: '',
      userId: '',
      email: '',
      password: '',
      country: '',
    };
    set({ user: emptyUser });
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('AsyncStorage 삭제 실패', error);
    }
  },

  loadUserFromStorage: async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // 불러올 때도 password는 비워두기
        set({
          user: {
            ...parsedUser,
            password: '',
          },
        });
      }
    } catch (error) {
      console.error('AsyncStorage 불러오기 실패', error);
    }
  },
}));
