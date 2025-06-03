import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GlobalMoneyResultModal = ({ isVisible, onClose, result }) => {
  if (!result) return null;

  const { total, currency_symbol, detected, converted_total_krw, image_base64 } = result;

  const detectedList = Object.entries(detected);

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>환율 정보</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 이미지 표시 */}
          {image_base64 ? (
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${image_base64}` }}
                style={{ width: 180, height: 120, borderRadius: 8, backgroundColor: '#eee' }}
                resizeMode="contain"
              />
            </View>
          ) : null}

          {/* 금액 정보 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>환율반영 실시간 가격 정보</Text>
            <View style={styles.row}>
              <Text style={styles.moneyText}>{currency_symbol} {total.toLocaleString()}</Text>
              <Text style={styles.moneyText}>₩ {converted_total_krw.toLocaleString()}</Text>
            </View>
          </View>

          {/* 지폐 정보 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>지폐/주화 개수</Text>
            {detectedList.map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.moneyText}>{currency_symbol} {key.replace(/[^\d]/g, '')}</Text>
                <Text style={styles.moneyText}>{value}개</Text>
              </View>
            ))}
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
    padding: 20,
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
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  moneyText: {
    fontSize: 15,
    fontWeight: '600',
  },
});