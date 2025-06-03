import axios from 'axios';
import { API_BASE_URL } from '../config';

const aiPaymentGuide = async (imageUri) => {
  try {
    // 중복된 file:// 제거
    const cleanedUri = imageUri.replace('file://file://', 'file://');

    const formData = new FormData();
    formData.append('image', {
      uri: cleanedUri,
      type: 'image/jpeg',
      name: 'menu.jpg',
    });

    console.log('📤 전송 시작...');
    console.log('전송할 이미지 URI:', cleanedUri);
    console.log('전송할 FormData:', formData);
    
    const response = await axios.post(
      `${API_BASE_URL}/process`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('✅ 전송 완료:', response.data);
    return response.data;
  } catch (err) {
    console.error('❌ 전송 실패:', err.message || err);
  }
};

export default aiPaymentGuide;
