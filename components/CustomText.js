import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const fontMap = {
  100: 'Pretendard-Thin',
  200: 'Pretendard-ExtraLight',
  300: 'Pretendard-Light',
  400: 'Pretendard-Regular',
  500: 'Pretendard-Medium',
  600: 'Pretendard-SemiBold',
  700: 'Pretendard-Bold',
  800: 'Pretendard-ExtraBold',
  900: 'Pretendard-Black',
};

export default function CustomText({ weight = 400, style, ...props }) {
  return (
    <RNText
      {...props}
      style={[styles[weight] || styles[400], style]}
    />
  );
}

const styles = StyleSheet.create({
  100: { fontFamily: fontMap[100] },
  200: { fontFamily: fontMap[200] },
  300: { fontFamily: fontMap[300] },
  400: { fontFamily: fontMap[400] },
  500: { fontFamily: fontMap[500] },
  600: { fontFamily: fontMap[600] },
  700: { fontFamily: fontMap[700] },
  800: { fontFamily: fontMap[800] },
  900: { fontFamily: fontMap[900] },
});
