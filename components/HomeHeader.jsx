import { View, Text, StyleSheet } from 'react-native';

function HomeHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        안녕하세요 <Text style={styles.name}>성유빈</Text> 님,
      </Text>
      <Text style={styles.today}>
        오늘은 🇯🇵 <Text style={styles.boldBlue}>2일차</Text> 예요
      </Text>

      <View style={styles.exchangeBox}>
        <View style={styles.card}>
          <Text style={styles.label}>원화 KRW</Text>
          <Text style={styles.value}>974.35 원</Text>
          <Text style={styles.change}>▲ 3.74 (+0.39%)</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>엔화 JPY</Text>
          <Text style={styles.value}>¥100</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  greeting: { fontSize: 15, fontWeight: '600' },
  name: { color: '#1D4595' },
  today: { fontSize: 22, marginVertical: 8, fontWeight: '900' },
  boldBlue: { color: '#1D4595', fontWeight: 'bold' },
  exchangeBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  card: { backgroundColor: '#eef3ff', padding: 10, borderRadius: 8, width: '48%' },
  label: { fontSize: 13, color: '#666', fontWeight: '600' },
  value: { fontSize: 18, fontWeight: 'bold' },
  change: { color: 'red', fontSize: 12, marginTop: 4 },
});
