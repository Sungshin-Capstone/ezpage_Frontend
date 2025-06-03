import axios from 'axios';
import { GLOBAL_MONEY_SCANNER_API } from '../config';

export const aiGlobalMoneyScanner = async (imageUri) => {
  try {
    const cleanedUri = imageUri.replace('file://file://', 'file://');

    const formData = new FormData();
    formData.append('file', {
      uri: cleanedUri,
      type: 'image/jpeg',
      name: 'menu.jpg',
    });

    const response = await axios.post(`${GLOBAL_MONEY_SCANNER_API}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; 
  } catch (error) {
    console.error('❌ 모델 API 호출 오류:', error);
    throw error;
  }
}
