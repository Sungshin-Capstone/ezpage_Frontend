import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/Home';
import CameraScreen from './app/CameraScreen';
import MyPage from './app/MyPage';
import SignIn from './app/SignIn';
import SignUp from './app/SignUp';
import MyWallet from './app/MyWallet';
import useUserStore from './stores/userStore';


const Stack = createNativeStackNavigator();

export default function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="MyWallet" component={MyWallet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
