// components/modals/AddExpense.tsx
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomModal from './CustomModal';

export default function AddExpense({ visible, onClose }: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <CustomModal
      isVisible={visible}
      onClose={onClose}
      onSubmit={() => {
        console.log('지출 내역 추가됨');
        onClose();
      }}
      title="지출 내역 추가"
    >
      {/* 이 영역을 페이지마다 다르게 */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>일시</Text>
        <TouchableOpacity>
            <Text style={styles.editText}>2025년 3월 31일 12:08</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>지출 금액</Text>
        <View style={styles.rowEnd}>
          <Text>7,800엔</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>모임 인원</Text>
        <View style={styles.rowEnd}>
          <Text style={styles.info}>4명</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>별칭</Text>
        <View style={styles.rowEnd}>
          <TouchableOpacity>
            <Text style={styles.editText}>입력하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>1/N 계산 금액</Text>
        <View style={styles.rowEnd}>
          <Text>19,250원</Text>
        </View>
      </View>
      
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  info: {
    color: '#000',
    fontSize: 14,
  },
  editText: {
    color: '#888',
    fontSize: 13,
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
})