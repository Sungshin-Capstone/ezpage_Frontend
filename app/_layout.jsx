import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyPage from './screens/MyPage';
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // 기본 헤더 숨기기
        }}
      >
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={({ navigation }) => ({
            title: '마이페이지',
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Ionicons name="chevron-back" size={24} color="#363853" />
              </TouchableOpacity>
            ),
            animationEnabled: true,
            animationTypeForReplace: 'pop',
          })}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          // 기본 헤더 숨김 (필요하면 options 추가)
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
