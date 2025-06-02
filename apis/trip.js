import api from "./api"
import AsyncStorage from '@react-native-async-storage/async-storage';

const tripApi = {
  addTrip: async (formData) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      const response = await api.post("/api/v1/trips/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('서버 응답 에러:', error.response.status);
        console.error('응답 데이터:', error.response.data);
        console.error('응답 헤더:', error.response.headers);
      } else if (error.request) {
        console.error('응답 없음:', error.request);
      } else {
        console.error('요청 에러:', error.message);
      }
      console.error('에러 설정:', error.config);
      throw error;
    }
  },

  getTrip: async (trip_id) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token을 찾을 수 없습니다.');

      const response = await api.get(`/api/v1/trips/${trip_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('여행 정보 조회 실패:', error);
      throw error;
    }
  },
};

export default tripApi;