import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AddExpense from './modals/AddExpense';
import expenseApi from '../apis/expense';
import useUserStore from '../stores/userStore';
import moment from 'moment';


function Expense({ selectedDate }) {
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { accessToken } = useUserStore();

  const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');

  useEffect(() => {
  const fetchExpenses = async () => {
    if (!accessToken) return;

    try {
      const allExpenses = await expenseApi.viewExpense(accessToken, formattedSelectedDate);
      console.log('받아온 지출 내역:', allExpenses);  // 여기에 출력
      const filtered = allExpenses.filter(expense => expense.date === formattedSelectedDate);
      setExpenses(filtered);
      console.log('formattedSelectedDate:', formattedSelectedDate);
    } catch (error) {
      console.error('지출 내역 조회 실패:', error);
      setExpenses([]);
    }
  };

  fetchExpenses();
}, [formattedSelectedDate, accessToken]);

  const handleAddExpense = async (newExpense) => {
  if (!accessToken) return;

  try {
    await expenseApi.addExpense(accessToken, newExpense);
    const allExpenses = await expenseApi.viewExpense(accessToken, formattedSelectedDate);
    const filtered = allExpenses.filter(expense => expense.date === formattedSelectedDate);
    setExpenses(filtered);
    } catch (error) {
      console.error('지출 추가 실패:', error);
    Alert.alert('지출 추가에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
        onAdd={handleAddExpense}
      />

      {expenses.length === 0 ? (
        <Text>지출이 없습니다.</Text>
      ) : (
        expenses.map((item, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.icon}>
              {item.category === 'FOOD' ? '🍱' : item.category === 'TRANSPORT' ? '🚗' : item.category === 'SHOPPING' ? '🛒' : '➰'}
            </Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.description}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{item.amount.toLocaleString()} {item.currency}</Text>
              {/* <Text style={styles.krw}>{item.krw}</Text> */}
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
  icon: { fontSize: 24, marginRight: 10, },
  info: { flex: 1 },
  name: { fontWeight: 'bold' },
  time: { color: '#888', fontSize: 12 },
  amountBox: { alignItems: 'flex-end' },
  amount: { fontWeight: 'bold' },
  krw: { fontSize: 12, color: '#999' },
});

export default Expense 