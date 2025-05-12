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
        router.replace('/Home');  
      } else {
        router.replace('/SignIn'); 
      }
    };

    init();
  }, []);

  return null; 
}