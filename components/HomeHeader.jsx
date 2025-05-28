import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../stores/userStore';

function HomeHeader() {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user); 

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        안녕하세요{' '}
        <Text style={styles.name}>
          {user?.name || user?.nickname || '사용자'}
        </Text>{' '}
        님,
      </Text>
      <Text style={styles.today}>
        오늘은 <Text style={styles.country}>🇯🇵 </Text><Text style={styles.boldBlue}>2일차</Text> 예요
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('MyWallet')}>
      
        <LinearGradient
          colors={['#ACD0FF', '#FFFFFF']}
          style={styles.card}
        >
          <View style={{ padding: 15 }}>
            <Text style={styles.label}>현재 보유 중인 금액</Text>
            <Text style={styles.value}>$ 653</Text>
          </View>
          <View style={{padding: 13 }}>
            <Text style={styles.change}>92만 8,305원</Text>
          </View>
        </LinearGradient>
        
      </TouchableOpacity>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '600',
  },
  country: {
    fontSize: 30,
  },
  name: {
    color: '#1D4595'
  },
  today: {
    fontSize: 22,
    marginVertical: 3,
    fontWeight: '900',
    marginTop: 2,
  },
  boldBlue: {
    color: '#1D4595', fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#eef3ff',
    marginTop: 6,
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
