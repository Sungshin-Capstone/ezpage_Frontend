import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AddExpense from './modals/AddExpense';
import expenseApi from '../apis/expense';
import useUserStore from '../stores/userStore';

const dummyExpenses = {
  '2025-04-07': [
    {
      name: 'STARBUCKS',
      time: '14:04',
      amount: '- ¥450',
      krw: '4,469.79 원',
      icon: require('../assets/images/icon.png'),
    },
    {
      name: '편의점',
      time: '09:15',
      amount: '- ¥200',
      krw: '1,987.54 원',
      icon: require('../assets/images/icon.png'),
    },
    {
      name: '편의점',
      time: '09:15',
      amount: '- ¥200',
      krw: '1,987.54 원',
      icon: require('../assets/images/icon.png'),
    },
    {
      name: '편의점',
      time: '09:15',
      amount: '- ¥200',
      krw: '1,987.54 원',
      icon: require('../assets/images/icon.png'),
    },
    {
      name: '편의점',
      time: '09:15',
      amount: '- ¥200',
      krw: '1,987.54 원',
      icon: require('../assets/images/icon.png'),
    },
  ],
  '2025-04-06': [
    {
      name: '점심식사',
      time: '12:30',
      amount: '- ¥800',
      krw: '7,920.00 원',
      icon: require('../assets/images/icon.png'),
    },
  ],
};

function Expense({ selectedDate }) {
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { accessToken } = useUserStore();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!accessToken) return; // 토큰 없으면 요청 안 함
      try {
        const data = await expenseApi.viewExpense(accessToken, selectedDate);
        setExpenses(data);
      } catch (error) {
        console.error('지출 내역 조회 실패:', error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, [selectedDate, accessToken]); 

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>💸 지출 내역</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="edit-2" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <AddExpense
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {expenses.length === 0 ? (
        <Text>지출이 없습니다.</Text>
      ) : (
        expenses.map((item, index) => (
          <View style={styles.item} key={index}>
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.krw}>{item.krw}</Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: 40, height: 40, marginRight: 10 },
  info: { flex: 1 },
  name: { fontWeight: 'bold' },
  time: { color: '#888', fontSize: 12 },
  amountBox: { alignItems: 'flex-end' },
  amount: { fontWeight: 'bold' },
  krw: { fontSize: 12, color: '#999' },
});

export default Expense 