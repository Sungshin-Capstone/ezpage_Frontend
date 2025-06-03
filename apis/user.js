import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"

const userApi = {
  signUp: async (formData) => {
    try {
      const res = await api.post("/api/v1/register/", {
        username: formData.username,
        password: formData.password,
        password2: formData.password2,
        nickname: formData.nickname,
        name: formData.name,
        email: formData.email,
        country: formData.country,
        profile_image: formData.profile_image,
      });
      console.log("회원가입 성공", res);
      return true;
    } catch (err) {
      console.log("회원가입 실패", err);
      return false;
    }
  },

  signIn: async (username, password) => {
    try {
      const res = await api.post("/api/v1/login/", { username, password });
      console.log("서버 응답 전체:", res.data);

      const accessToken = res.data?.access;

      if (!accessToken) {
      console.log('accessToken이 응답에 없습니다.');
      return false;
    }

      await AsyncStorage.setItem("accessToken", accessToken);
      console.log("로그인 성공, accessToken 저장됨:", accessToken);
      return true;
    } catch (err) {
      console.log("로그인 실패", err);
      return false;
    }
  },

  logOut: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const res = await api.post("/api/v1/logout/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("로그아웃 성공", res);
      await AsyncStorage.removeItem("accessToken");
      return true;
    } catch (err) {
      console.log("로그아웃 실패", err);
      return false;
    }
  },

  Profile: async (accessToken) => {
    try {
    const response = await api.get("/api/v1/profile/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
    });
      return response.data;  
      
  } catch (error) {
    console.error('프로필 조회 실패:', error);
    throw error;
  }
  }
};

export default userApi;