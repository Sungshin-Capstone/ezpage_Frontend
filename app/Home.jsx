import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

// import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import HomeHeader from '../components/HomeHeader';
import CalendarSection from '../components/CalendarSection';
import Expense from '../components/Expense';

export default function Home() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 상단 네브바 */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Icon name="dots-three-vertical" size={15} color="black" />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
              <Icon name="person-outline" style={{ marginRight: 10 }} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="settings-outline" size={24} color="black" />
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
          <TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}>
            <Image
              source={require('../assets/images/ezpageIcon.png')}
              style={styles.bottomIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
