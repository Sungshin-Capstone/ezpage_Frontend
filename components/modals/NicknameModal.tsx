import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import useUserStore from '../../stores/userStore';

type Props = {
  visible: boolean;
  onClose: () => void;
  initialNickname: string;
  onSave: (newNickname: string) => void;
};

const NicknameModal = ({ visible, onClose, initialNickname, onSave }: Props) => {
  const [nickname, setNickname] = useState(initialNickname);
  const user = useUserStore((state) => state.user); 

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>닉네임 수정</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="새 닉네임"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSave(nickname)} style={styles.modalButton}>
              <Text style={styles.saveText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NicknameModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  modalButton: {
    marginLeft: 10,
  },
  cancelText: {
    color: '#888',
  },
  saveText: {
    fontWeight: 'bold',
    color: '#000',
  },
});