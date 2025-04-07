import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // 헤더 숨기기
      />
      <Stack.Screen
        name="MyPage"
        options={{ headerShown: false }} // 헤더 숨기기
      />
    </Stack>
  );
}
