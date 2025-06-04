import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../stores/userStore';
import { useTripStore } from '../stores/useTripStore';
import { useEffect } from 'react';
import tripApi from '../apis/trip';
import { countryCodeToFlag } from '../utils/countryCodeToFlag';

function HomeHeader() {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  const { todayTrip, setTodayTrip } = useTripStore();

  useEffect(() => {
  const fetchTrips = async () => {
    try {
      const allTrips = await tripApi.getAllTrips();
      const todayStr = new Date().toISOString().split('T')[0];

      const matchedTrip = allTrips.find((trip) => {
        return todayStr >= trip.start_date && todayStr <= trip.end_date;
      });

      setTodayTrip(matchedTrip); // useState로 관리
    } catch (e) {
      console.error('🔥 여행 불러오기 실패:', e);
    }
  };

  fetchTrips();
}, []);

  const renderTripInfo = () => {
    if (!todayTrip) {
      return <Text style={styles.today}>오늘은 여행일정이 없어요!</Text>;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const dayCount =
      Math.floor(
        (new Date(todayStr) - new Date(todayTrip.start_date)) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const flag = countryCodeToFlag(todayTrip.country || 'KR');
    const dayText = `${dayCount}일차`;

    return (
      <Text style={styles.today}>
        오늘은 <Text style={styles.country}>{flag} </Text>
        <Text style={styles.boldBlue}>{dayText}</Text> 예요
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        안녕하세요{' '}
        <Text style={styles.name}>
          {user?.nickname || user?.name || '사용자'}
        </Text>{' '}
        님,
      </Text>
      {renderTripInfo()}

      <TouchableOpacity onPress={() => navigation.navigate('MyWallet')}>
      
        <LinearGradient
          colors={['#ACD0FF', '#FFFFFF']}
          style={styles.card}
        >
          <View style={{ padding: 15 }}>
            <Text style={styles.label}>현재 보유 중인 금액</Text>
            <Text style={styles.value}>¥ 653</Text>
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
    marginVertical: 5,
  },
  greeting: {
    fontSize: 16,
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
