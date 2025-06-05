import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"

const walletApi = {
  getWalletInfo: async (tripId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token을 찾을 수 없습니다.');

      const response = await api.get(`/api/v1/wallet/?trip_id=${tripId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('지갑 정보 조회 실패:', error);
      throw error;
    }
  },
  globalMoneyScanner: async (formData) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token을 찾을 수 없습니다.');

      const response = await api.post("/api/v1/wallet/scan-result/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('AI 지갑 정보 추가 실패:', error);
      throw error;
    }
  }
};

export default walletApi;