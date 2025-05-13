import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '../stores/userStore';

export default function Index() {
  const router = useRouter();
  const { userToken, loadUserFromStorage } = useUserStore();

  useEffect(() => {
    const init = async () => {
      await loadUserFromStorage();

      if (userToken) {
        router.replace('/SignIn');  
      } else {
        router.replace('/Home');  // 둘이 바꿔야함
      }
    };

    init();
  }, []);

  return null; 
}