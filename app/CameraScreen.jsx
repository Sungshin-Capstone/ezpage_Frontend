import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [useAIGuide, setUseAIGuide] = useState(true);
  const devices = useCameraDevices();
  const device = devices.back ?? devices.front ?? devices[0] ?? devices[1];

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized' || status === 'granted');
    };
    requestPermission();
  }, []);

  const toggleCamera = () => {
    setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const handleCapture = () => {
    // 촬영 로직 자리 (Vision Camera API 연동 예정)
    console.log('촬영 버튼 클릭됨');
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        console.log('선택한 이미지:', response.assets[0].uri);
      }
    });
  };

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
    return (
      <View style={styles.center}>
        <Text style={styles.text}>카메라 준비 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />

        {/* 상단 옵션 바 */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>↻</Text>
            <Text style={styles.iconSubText}>30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="volume-mute" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleCamera}>
            <Icon name="camera-reverse" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={[styles.iconText, { color: 'red' }]}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fullBottomWrapper}>
          {/* 하단 촬영 + 갤러리 바 */}
          <View style={styles.captureBar}>
            <TouchableOpacity onPress={openGallery}>
              <Image source={{ uri: 'https://placehold.co/40x40.png' }} style={styles.thumbnail} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCapture}>
              <Image source={require('../assets/images/ezpageIcon.png')} style={styles.camerabutton} />
            </TouchableOpacity>

            <View style={{ width: 40 }} />
          </View>

          {/* AI 토글 바 - 촬영 버튼 아래 */}
          <View style={styles.aiToggleBar}>
            <TouchableOpacity onPress={() => setUseAIGuide(true)} style={styles.aiToggleContainer}>
              <Text style={[styles.aiLabel, useAIGuide && styles.aiLabelActive]}>AI 지불 가이드</Text>
              {useAIGuide && <View style={styles.trianglePointer} />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setUseAIGuide(false)} style={styles.aiToggleContainer}>
              <Text style={[styles.aiLabel, !useAIGuide && styles.aiLabelActive]}>글로벌 머니 스캐너</Text>
              {!useAIGuide && <View style={styles.trianglePointer} />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: 'black',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 18,
  },
  iconSubText: {
    color: 'white',
    fontSize: 10,
    marginTop: -4,
  },
  
  camerabutton: {
    width: 100,
    height: 100,
  },
  fullBottomWrapper: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  backgroundColor: 'black',
  paddingBottom: 10,
},
  captureBar: {
    flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 10,
  },
  aiToggleBar: {
    flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 8,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  aiToggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiLabel: {
    fontSize: 12,
    color: 'gray',
  },
  aiLabelActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  trianglePointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    marginTop: 2,
  },
});

export default CameraScreen;