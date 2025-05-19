import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const CameraScreen = () => {
  // 권한 상태와 권한 요청 함수 가져오기
  const [permission, requestPermission] = useCameraPermissions();

  console.log("권한",permission)

  // 상태 선언 (JS라 타입 선언 제거)
  const [facing, setFacing] = useState('back'); // front / back
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState('off'); // off / on
  const cameraRef = useRef(null);

  // 권한 확인 및 요청
  const checkPermissions = () => {
    if (!permission) return;

    if (permission.status !== 'granted') {
      if (!permission.canAskAgain) {
        Alert.alert(
          '권한 필요',
          '앱 설정에서 카메라 권한을 변경해주세요.',
          [
            { text: '취소', style: 'cancel' },
            {
              text: '설정 열기',
              onPress: () => Linking.openSettings(),
            },
          ],
          { cancelable: false }
        );
      } else {
        requestPermission();
      }
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [permission]);

  // 카메라 앞/뒤 전환 함수
  const toggleFacing = () => {
    setFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  // 플래시 on/off 토글 함수
  const toggleFlash = () => {
    setFlash(prev => (prev === 'off' ? 'on' : 'off'));
  };

  return (
    <View style={styles.container}>
      {permission && permission.status === 'granted' ? (
        <>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            zoom={zoom}
            animateShutter={true}
            flash={flash}
          />

          {/* 카메라 조작 버튼들 */}
          <View style={styles.controls}>
            <TouchableOpacity onPress={toggleFacing} style={styles.button}>
              <Text style={styles.buttonText}>앞/뒤 전환</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFlash} style={styles.button}>
              <Text style={styles.buttonText}>플래시 {flash === 'on' ? '켜짐' : '꺼짐'}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.noPermission}>
          <Text style={{ color: '#fff' }}>카메라 권한이 필요합니다.</Text>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  noPermission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
