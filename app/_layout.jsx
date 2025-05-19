import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 모든 화면에서 헤더 숨기기
      }}>

      {/* 마이페이지 */}
        <Stack.Screen
          name="MyPage"
          options={{
            title: '마이페이지',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 10 }}>
                <Ionicons name="chevron-back" size={24} color="#363853" />
              </TouchableOpacity>
            ),
            animation: 'slide_from_right', 
          }}
      />
      {/* 스마트 스캐너 */}
      <Stack.Screen
        name="CameraScreen"
      />

    </Stack>
  );
}
