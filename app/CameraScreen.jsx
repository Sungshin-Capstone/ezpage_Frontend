import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    // 권한 요청은 react-native-camera 내부에서 자동 처리하는 편,
    // 아니면 react-native-permissions 사용 가능
  }, []);

  const toggleFacing = () => {
    setType(
      type === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back
    );
  };

  const toggleFlash = () => {
    setFlash(
      flash === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.on
        : RNCamera.Constants.FlashMode.off
    );
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flash}
        androidCameraPermissionOptions={{
          title: '카메라 권한 필요',
          message: '카메라 권한이 필요합니다.',
          buttonPositive: '허용',
          buttonNegative: '거부',
        }}
        notAuthorizedView={
          <View style={styles.noPermission}>
            <Text style={{ color: '#fff' }}>카메라 권한이 필요합니다.</Text>
          </View>
        }
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleFacing} style={styles.button}>
          <Text style={styles.buttonText}>앞/뒤 전환</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlash} style={styles.button}>
          <Text style={styles.buttonText}>
            플래시 {flash === RNCamera.Constants.FlashMode.on ? '켜짐' : '꺼짐'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, width: '100%' },
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
  buttonText: { color: '#fff', fontSize: 16 },
  noPermission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
