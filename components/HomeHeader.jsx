import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

function HomeHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        안녕하세요 <Text style={styles.name}>성유빈</Text> 님,
      </Text>
      <Text style={styles.today}>
        오늘은 <Text style={styles.country}>🇯🇵 </Text><Text style={styles.boldBlue}>2일차</Text> 예요
      </Text>

      <TouchableOpacity onPress={() => router.push('/MyWallet')}>
      <View style={styles.box} >
        <LinearGradient
          colors={['#ACD0FF', '#FFFFFF']}
          style={styles.card}
        >
          <View style={{ gap: 5 }}>
          <Text style={styles.label}>현재 보유 중인 금액</Text>
            <Text style={styles.value}>$ 653</Text>
          </View>
          <View>
            <Text style={styles.change}>92만 8,305원</Text>
          </View>
        </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  greeting: {
    fontSize: 15, fontWeight: '600'
  },
  country: {
    fontSize: 30
  },
  name: {
    color: '#1D4595'
  },
  today: {
    fontSize: 22, marginVertical: 8, fontWeight: '900'
  },
  boldBlue: {
    color: '#1D4595', fontWeight: 'bold'
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    marginTop: 7,
    
  },
  card: {
    backgroundColor: '#eef3ff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  label: {
    fontSize: 13, color: '#666', fontWeight: '600'
  },
  value: {
    fontSize: 25, fontWeight: 'bold'
  },
  change: {
    color: '#3374F6', fontSize: 14, fontWeight: '600', marginBottom: 4
  },
});
