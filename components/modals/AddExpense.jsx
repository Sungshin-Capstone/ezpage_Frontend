import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomModal from './CustomModal';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddExpense({ visible, onClose, onAdd, todayTrip }) {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '식비', value: 'FOOD' },
    { label: '교통', value: 'TRANSPORT' },
    { label: '쇼핑', value: 'SHOPPING' },
    { label: '기타', value: 'ETC' },
  ]);

  const currencySymbols = {
    KRW: '₩',
    USD: '$',
    JPY: '¥',
    CNY: '¥',
  };

  const countryToCurrency = {
    KR: 'KRW',
    US: 'USD',
    JP: 'JPY',
    CN: 'CNY',
  };

  useEffect(() => {
    if (todayTrip?.country) {
      const newCurrency = countryToCurrency[todayTrip.country] || 'USD';
      setCurrency(newCurrency);
    }
  }, [todayTrip]);

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    if (!category || !amount || !description || isNaN(parseFloat(amount))) {
      alert('모든 항목을 올바르게 입력해 주세요!');
      return;
    }

    const payload = {
      amount: parseFloat(amount),
      currency: currency,
      date: moment(date).format('YYYY-MM-DD'),
      time: moment(date).format('HH:mm'),
      category,
      description,
      manual_input: true,
      is_scan_result: false,
    };

    console.log('추가될 지출 내역:', payload);
    onAdd?.(payload);
    onClose();
  };

  return (
    <CustomModal
      isVisible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="지출 내역 추가"
    >
      <View style={styles.row}>
        <Text style={styles.label}>지출 내용</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="예: 스시"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>일시</Text>
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <Text style={styles.value1}>{moment(date).format('YYYY년 M월 D일 HH:mm')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>지출 금액</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder={`예: 7800 (${currencySymbols[currency] || ''})`}
        />
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 1 }]}>카테고리</Text>
        <View style={{ width: 150 }}>
          <DropDownPicker
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="선택하세요"
            style={styles.dropdown}
            placeholderStyle={{ color: '#aaa', fontSize: 16 }}
            textStyle={{ color: '#000', fontSize: 16 }}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  row: {
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
  value1: {
    fontSize: 16,
    color: '#767676',
    textDecorationLine: 'underline',
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#EEEEEE',
    minWidth: 100,
  },
  dropdown: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 0,
    width: 150,
  },
  dropdownContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    borderWidth: 0,
    width: 150,
  },
});
