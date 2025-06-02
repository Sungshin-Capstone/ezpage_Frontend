// components/modals/AddExpense.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Platform, } from 'react-native';
import CustomModal from './CustomModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import tripApi from '../../apis/trip';

const COLORS = ['#FFB3B3', '#FFBF87', '#FFF5B7', '#AFF6A7', '#A8F5FF', '#78B0FF'];

export default function AddSchedule({ visible, onClose, onSuccess }) {
  const [travelName, setTravelName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(null);

  const resetForm = () => {
    setTravelName('');
    setDestination('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedColor(null);
  };

  const handleSubmit = async () => {
    if (!travelName || !destination || !selectedColor) {
      Alert.alert('입력 오류', '모든 필드를 입력해 주세요.');
      return;
    }

    const scheduleData = {
      name: travelName,
      country: destination,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      companions: "1",
      color: selectedColor,
    };

    try {
      const response = await tripApi.addTrip(scheduleData);
      console.log('전송할 schedule:', scheduleData);
      console.log('여행 추가 성공:', response);
      if (onSuccess) onSuccess(response); // 부모로 전달
      resetForm();
      onClose();
    } catch (error) {
      console.error('여행 추가 실패:', error);
      Alert.alert('추가 실패', '일정 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <CustomModal
      isVisible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
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
