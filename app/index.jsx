import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../stores/userStore';

export default function Index() {
  const navigation = useNavigation();
  const { userToken, loadUserFromStorage } = useUserStore();

  useEffect(() => {
    const init = async () => {
      await loadUserFromStorage();

      if (userToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }], 
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],  // 둘이 바꿔야함
        });
      }
    };

    init();
  }, [userToken, loadUserFromStorage, navigation]);

  return null; 
}
