import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"

//https://ezpage-backend.onrender.com/api/v1/expenses/scan-result/
//https://ezpage-backend.onrender.com/api/v1/expenses/date/?date=2025-05-14

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
  }
}

export default expenseApi;