// components/modals/AddExpense.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Platform, } from 'react-native';
import CustomModal from './CustomModal';
import DateTimePicker from '@react-native-community/datetimepicker';

const COLORS = ['#FF3B30', '#FF9500', '#FFD60A', '#34C759', '#5AC8FA', '#007AFF'];

export default function AddSchedule({ visible, onClose, onSubmit }) {
  const [travelName, setTravelName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSubmit = () => {
    if (!travelName || !destination || !selectedColor) return;

    const scheduleData = {
      travelName,
      destination,
      startDate,
      endDate,
      color: selectedColor,
    };

    onSubmit(scheduleData); // 부모 컴포넌트로 전달
    onClose();
    // 초기화
    setTravelName('');
    setDestination('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedColor(null);
  };

  return (
    <CustomModal
      isVisible={visible}
      onClose={onClose}
      onSubmit={() => {
        handleSubmit();
        console.log('여행 일정 추가됨');
        onClose();
      }}
      title="여행 일정 설정"
    >
      <View style={{ padding: 7 }}>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="여행 이름"
            value={travelName}
            onChangeText={setTravelName}
          />
          <TextInput
            style={styles.input}
            placeholder="여행지"
            value={destination}
            onChangeText={setDestination}
          />
        </View>
      
        <View style={styles.dateBox}>
          <Text style={styles.label}>시작일</Text>
          <DateTimePicker
            value={startDate}
            mode="datetime"
            onChange={(event, date) => date && setStartDate(date)}
          />
        </View>
      
        <View style={styles.dateBox}>
          <Text style={styles.label}>종료일</Text>
          <DateTimePicker
            value={endDate}
            mode="datetime"
            onChange={(event, date) => date && setEndDate(date)}
          />
        </View>

        <View style={styles.box2}>
        <Text style={{ fontSize: 16, fontWeight: '500'}}>여행지 색상</Text>
        <View style={styles.colorContainer}>
          {COLORS.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.selectedCircle,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
          </View>
          </View>

      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginVertical: 10,
  },

  dateBox: {
    padding: 10, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 10,
  },
  colorCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 10,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: '#000',
  },
  box2: {
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    padding: 17,
  },
});
