import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isVisible, onClose, onSubmit, title, children }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.3}
      style={styles.modalContainer}
    >
      <View style={styles.modal}>
        {/* 상단 고정 영역 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>취소</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.submit}>추가</Text>
          </TouchableOpacity>
        </View>

        {/* 유동적 내용 영역 */}
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  cancel: {
    fontSize: 16,
    color: '#595959',
  },
  submit: {
    fontSize: 16,
    color: '#595959',
  },
  content: {
    padding: 12,
    gap: 14,
    marginBottom: 60,
  },
});
