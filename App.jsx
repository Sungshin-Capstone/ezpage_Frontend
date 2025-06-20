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
import SplashScreen from "react-native-splash-screen";
import { useTodayTripIdStore } from './stores/useTodayTripIdStore';


const Stack = createNativeStackNavigator();

export default function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000); 
  });

  useEffect(() => {
    useTodayTripIdStore.getState().fetchAndStoreTodayTripId();
  }, []);
  
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
