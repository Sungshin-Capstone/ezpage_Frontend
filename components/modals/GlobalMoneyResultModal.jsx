import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import walletApi from '../../apis/wallet';
import { useTodayTripIdStore } from '../../stores/useTodayTripIdStore';

const GlobalMoneyResultModal = ({ isVisible, onClose, result }) => {
  if (!result) return null;

  const { total, currency_symbol, detected, converted_total_krw, image_base64 } = result;

  const detectedList = Object.entries(detected);

  const addWallethandler = async () => {
  
    const todayTripId = useTodayTripIdStore((state) => state.todayTripId);
    if (!todayTripId) {
      Alert.alert('오늘의 여행이 없습니다. 여행을 먼저 등록해주세요.');
      return;
    }

    console.log('tripId:', todayTripId);

    const payload = {
      trip_id: todayTripId,
      total: result.total,
      currency_symbol: result.currency_symbol,
      converted_total_krw: result.converted_total_krw,
      detected: result.detected,
    };
    
     console.log('전송할 payload:', payload);

    try {
      const add = await walletApi.globalMoneyScanner(payload);
      console.log('지갑에 추가 결과:', add);
      if (add) {
        Alert.alert('지갑에 추가되었습니다.');
        onClose();
      }
    } catch (error) {
      console.error('지갑에 추가 실패:', error);
      Alert.alert('지갑에 추가하는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={[styles.modalContainer, { marginBottom: 40 }]}>
            <ScrollView style={{ maxHeight: 550 }}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>환율 정보</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* 이미지 표시 */}
              {image_base64 ? (
                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${image_base64}` }}
                    style={{ width: 300, height: 300, borderRadius: 8, backgroundColor: '#eee' }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}

              {/* 금액 정보 */}
              <Text style={styles.cardTitle}>환율반영 실시간 가격 정보</Text>
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.moneyText}>{currency_symbol} {total.toLocaleString()}</Text>
                  <Text style={styles.moneyText}>₩ {converted_total_krw.toLocaleString()}</Text>
                </View>
              </View>

              <View style={styles.separator} />

              {/* 지폐 정보 */}
              <Text style={styles.cardTitle}>지폐/주화 개수</Text>
              <View style={styles.card}>
                {detectedList.map(([key, value]) => (
                  <View key={key} style={styles.row}>
                    <Text style={styles.moneyText}>{currency_symbol} {key.replace(/[^\d]/g, '')}</Text>
                    <Text style={styles.moneyText}>{value}개</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.addbutton} onPress={addWallethandler}>
                <Text style={styles.addButtonText}>지갑에 추가하기</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalMoneyResultModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    color: '#333',
  },
  subInfo: {
    color: '#888',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#F0F6FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  moneyText: {
    fontSize: 15,
    fontWeight: '600',
  },
  addbutton: {
    backgroundColor: '#ACD0FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 0,
  },
});