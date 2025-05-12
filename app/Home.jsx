import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';

import HomeHeader from '../components/HomeHeader';
import CalendarSection from '../components/CalendarSection';
import Expense from '../components/Expense';

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 상단 네브바 */}
        <View style={styles.navBar}>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={15} color="black" />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => router.push('/MyPage')}>
              <Ionicons name="person-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 본문 */}
        <HomeHeader />
        <CalendarSection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Expense selectedDate={selectedDate} />
      </ScrollView>

      {/* 스마트 스캐너 */}
      <View style={styles.bottomIconWrapper}>
        <View style={styles.bottomIconShadow}>
          <Image
            source={require('../assets/images/ezpageIcon.png')}
            style={styles.bottomIcon}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 30,
    paddingBottom: 120, // 하단 아이콘 안 가리게
  },
  navBar: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bottomIconWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomIconShadow: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomIcon: {
    width: 100,
    height: 100,
  },
});
