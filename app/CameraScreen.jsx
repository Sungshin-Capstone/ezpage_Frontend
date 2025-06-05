import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import * as CameraRoll from '@react-native-camera-roll/camera-roll';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import aiPaymentGuide from '../apis/aiPaymentGuide';
import { aiGlobalMoneyScanner } from '../apis/aiGlobalMoneyScanner';
import AddMenu from '../components/modals/AddMenu';
import GlobalMoneyResultModal from '../components/modals/GlobalMoneyResultModal';
import PaymentGuide from '../components/modals/PaymentGuide';
import { ActivityIndicator } from 'react-native-paper';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [useAIGuide, setUseAIGuide] = useState(true);
  const devices = useCameraDevices();
  const device = devices.back ?? devices.front ?? devices[0] ?? devices[1];
  const cameraRef = useRef(null);
  const [lastPhotoUri, setLastPhotoUri] = useState(null);

  const [aiScannerResult, setAiScannerResult] = useState(null);
  const [aiPaymentResult, setAiPaymentResult] = useState(null);
  const [showResultModal1, setShowResultModal1] = useState(false);
  const [showResultModal2, setShowResultModal2] = useState(false);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('CameraRoll:', CameraRoll);
  }, []);
  
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

  const handleCapture = async () => {
    if (cameraRef.current == null) return;
    setLoading(true);

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });

      const imageUri = `file://${photo.path}`;
      console.log('📸 사진 URI:', imageUri);

      setLastPhotoUri(imageUri);

      if (useAIGuide) {
        console.log('🤖 AI 지불 가이드로 이미지 전송 중...');
        const result = await aiPaymentGuide(imageUri);
        if (result) {
          console.log('✅ 전송 완료, 결과:', result);
          setAiPaymentResult(result);
          setShowAddMenuModal(true);
        } else {
          console.warn('⚠️ 전송은 완료되었으나 결과가 없습니다.');
        }
      } else {
        console.log('🌍 글로벌 머니 스캐너로 이미지 전송 중...');
        const result = await aiGlobalMoneyScanner(imageUri);
        if (result) {
          console.log('✅ 글로벌 스캐너 결과:', result);
          setAiScannerResult(result);
          setShowResultModal2(true);
        } else {
          console.warn('⚠️ 글로벌 스캐너 결과가 없습니다.');
        }
      }
    } catch (e) {
      console.error('❌ 촬영 또는 전송 실패:', e.message);
      console.log('🛠️ 상세:', e);
    } finally {
      setLoading(false); 
    }
  };

  const openGallery = () => {
  launchImageLibrary({ mediaType: 'photo' }, async (response) => {
    if (response.assets && response.assets.length > 0) {
      const selectedImageUri = response.assets[0].uri;
      console.log('📁 선택한 이미지:', selectedImageUri);
      setLastPhotoUri(selectedImageUri);
      setLoading(true);

      try {
        if (useAIGuide) {
          console.log('🤖 AI 지불 가이드로 이미지 전송 중...');
          const result = await aiPaymentGuide(selectedImageUri);
          if (result) {
            console.log('✅ 전송 완료, 결과:', result);
            setAiPaymentResult(result);  
            setShowAddMenuModal(true);  
          } else {
            console.warn('⚠️ 전송은 완료되었으나 결과가 없습니다.');
          }
        } else {
          console.log('🌍 글로벌 머니 스캐너로 이미지 전송 중...');
          const result = await aiGlobalMoneyScanner(selectedImageUri);
          if (result) {
            console.log('✅ 글로벌 스캐너 결과:', result);
            setAiScannerResult(result);
            setShowResultModal2(true);
          } else {
            console.warn('⚠️ 글로벌 스캐너 결과가 없습니다.');
          }
        }
      } catch (error) {
        console.error('❌ 갤러리 이미지 전송 실패:', error.message || error);
      } finally {
        setLoading(false); 
      }
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
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
        />

        <View style={styles.fullBottomWrapper}>
          {/* 하단 촬영 + 갤러리 바 */}
          <View style={styles.captureBar}>
            <TouchableOpacity onPress={openGallery}>
              <Image
                source={
                  lastPhotoUri
                    ? { uri: lastPhotoUri }
                    : { uri: 'https://placehold.co/40x40.png' }
                }
                style={styles.thumbnail}
              />
            </TouchableOpacity>
            
            {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
            )}
            
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
      {showAddMenuModal && (
        <AddMenu
          isVisible={showAddMenuModal}
          onClose={() => setShowAddMenuModal(false)}
          onSubmit={(selectedItems) => {
            console.log('선택된 메뉴 ID:', selectedItems);
            setSelectedMenus(selectedItems);
            setShowAddMenuModal(false);
            setShowResultModal1(true);
          }}
          menus={aiPaymentResult}
        />
      )}
      {showResultModal1 && (
        <PaymentGuide
          isVisible={showResultModal1}
          onClose={() => setShowResultModal1(false)}
          onSubmit={() => {
            setShowResultModal1(false);
          }}
          selectedMenus={selectedMenus} 
        />
      )}
      {showResultModal2 && (
        <GlobalMoneyResultModal
          isVisible={showResultModal2}
          onClose={() => setShowResultModal2(false)}
          result={aiScannerResult}
        />
      )}
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
    width: 70,
    height: 70,
    margin: 20,
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
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

export default CameraScreen;