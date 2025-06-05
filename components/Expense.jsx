import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AddExpense from './modals/AddExpense';
import expenseApi from '../apis/expense';
import useUserStore from '../stores/userStore';
import moment from 'moment';
import { useTripStore } from '../stores/useTripStore';
import tripApi from '../apis/trip';


function Expense({ selectedDate }) {
  const [expenses, setExpenses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { accessToken } = useUserStore();
  const { todayTrip, setTodayTrip } = useTripStore();

  // 오늘 여행 정보 가져오기(화폐 반영)
  useEffect(() => {
    const fetchTrips = async () => {
    try {
      const allTrips = await tripApi.getAllTrips(); 
      const todayStr = new Date().toISOString().split('T')[0];

      const matchedTrip = allTrips.find((trip) => {
        return todayStr >= trip.start_date && todayStr <= trip.end_date;
      });

      setTodayTrip(matchedTrip); 
    } catch (e) {
      console.error('🔥 여행 불러오기 실패:', e);
      setTodayTrip(null); 
    }
  };

  fetchTrips();
  }, []);


  const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');

  useEffect(() => {
  const fetchExpenses = async () => {
    if (!accessToken) return;

    try {
      const allExpenses = await expenseApi.viewExpense(accessToken, formattedSelectedDate);
      console.log('받아온 지출 내역:', allExpenses); 
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
    console.error('🔹 message:', error.message);
    if (error.response) {
      console.error('🔹 response.status:', error.response.status);
      console.error('🔹 response.data:', error.response.data);
      console.error('🔹 response.headers:', error.response.headers);
    } else if (error.request) {
      console.error('🔹 요청은 갔지만 응답이 없습니다:', error.request);
    } else {
      console.error('🔹 에러 설정:', error.config);
    }

    Alert.alert('지출 추가에 실패했습니다.');
    }
  };

  const currencySymbols = {
    KRW: '₩',
    USD: '$',
    JPY: '¥',
    CNY: '¥', 
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>💸 지출 내역</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ fontSize: 20, color: 'black' }}>+</Text>
        </TouchableOpacity>
      </View>

      <AddExpense
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddExpense}
        todayTrip={todayTrip}
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
              <Text style={styles.amount}>
                {currencySymbols[item.currency] || ''} {item.amount.toLocaleString()}
              </Text>
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