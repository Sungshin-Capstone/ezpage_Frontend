import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"

const expenseApi = {
  viewExpense: async (accessToken, date) => {
    try {
      const response = await api.get(`/api/v1/expenses/date/?date=${date}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
      
    } catch (error) {
      console.error('지출 내역 조회 실패:', error);
      throw error;
    }
  },

  addExpense: async (accessToken, formData) => {
    try {
      const response = await api.post("/api/v1/expenses/", { ...formData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      return response.data;
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 에러 상태코드가 있는 경우
        console.error('서버 응답 에러:', error.response.status);
        console.error('응답 데이터:', error.response.data);
        console.error('응답 헤더:', error.response.headers);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못한 경우
        console.error('응답 없음:', error.request);
      } else {
        console.error('요청 에러:', error.message);
      }
      console.error('에러 설정:', error.config);
      throw error;
    }
  },
  // 지불 가이드 지출 등록
  addAiExpense: async (formData) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await api.post("/api/v1/expenses/guide-payment/", formData, {
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
      }
      else if (error.request) {
        console.error('응답 없음:', error.request);
      } else {
        console.error('요청 에러:', error.message);
      }
      throw error;
    }
  },
  
};

export default expenseApi;