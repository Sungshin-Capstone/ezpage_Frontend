import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import useUserStore from '../stores/userStore';

const MyWallet = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {/* <Icon name="chevron-back" size={28} color="#363853" /> */}
            <Image source={require('../assets/images/lessthan.png')} style={{ width: 17, height: 17 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>마이 월렛</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            현재 <Text style={{ fontSize: 20, fontWeight: '700' }}>
            {user.nickname}
          </Text>님이 보유 중인 금액
          </Text>
          <Text style={{ fontSize: 14, marginTop: 5 }}>
            지금까지의 현금 지출을 반영했어요
          </Text>

          <View style={styles.box}>
            <LinearGradient
              colors={['#ACD0FF', '#FFFFFF']}
              style={styles.card}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.value}>$ 653</Text>
                  <View style={styles.bill}>
                    <Text style={styles.subText}>$ 100 : 6장</Text>
                    <Text style={styles.subText}>$ 50 : 6장</Text>
                    <Text style={styles.subText}>$ 1 : 6장</Text>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={styles.change}>92만 8,305원</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <Text style={{ fontSize: 11 }}>* 금액이 변동되면 다시 스캔해 주세요</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 7,
  },
  card: {
    backgroundColor: '#eef3ff',
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  change: {
    color: '#3374F6',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  bill: {
    padding: 10,
  },
  subText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
});