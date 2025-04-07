import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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

function Expense({selectedDate}) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // selectedDate가 바뀔 때마다 실행됨
    const fetchExpenses = async () => {
      // 여기에 서버 요청도 가능
      const data = dummyExpenses[selectedDate] || [];
      setExpenses(data);
    };

    fetchExpenses();
  }, [selectedDate]); // ← selectedDate가 바뀔 때만 작동

  return (
    <View>
      <Text style={styles.title}>💸 지출 내역</Text>
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
  title: { fontSize: 16, marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
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