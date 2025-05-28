import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back ?? devices.front ?? devices[0] ?? devices[1];
 console.log('devices type:', typeof devices);
console.log('devices keys:', devices ? Object.keys(devices) : devices);
console.log('devices:', devices);


  useEffect(() => {
  (async () => {
    const status = await Camera.getCameraPermissionStatus();
    console.log('getCameraPermissionStatus:', status);
    const reqStatus = await Camera.requestCameraPermission();
    console.log('requestCameraPermission:', reqStatus);
    setHasPermission(reqStatus === 'authorized' || reqStatus === 'granted');
  })();
  }, []);
  
  useEffect(() => {
  console.log('사용 가능한 카메라들:', devices);
  console.log('back 카메라:', device);
}, [devices]);

  if (hasPermission === null) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>권한 상태 확인 중...</Text>
    </View>
  );
}

if (!hasPermission) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>카메라 권한을 허용해주세요!</Text>
    </View>
  );
}

  if (!device) {
    console.log('devices:', devices);
    console.log('device:', device);

    return (
      <View style={styles.center}>
        <Text style={styles.text}>카메라 준비 중...</Text>
      </View>
    );
  }

  const toggleCamera = () => {
    setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'));
  };

  return (
   <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />

      {/* 상단 옵션바 */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="flash-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.modeText}>PHOTO</Text>
        <TouchableOpacity onPress={toggleCamera}>
          <Icon name="camera-reverse-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 하단 촬영 영역 */}
      <View style={styles.bottomBar}>
        <Text style={styles.modeSelector}>PHOTO</Text>
        <TouchableOpacity style={styles.captureButton} />
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://placehold.co/60x60.png' }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: { color: '#fff' },

  topBar: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  modeText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1.2,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#ccc',
  },
  modeSelector: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.7,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default CameraScreen;