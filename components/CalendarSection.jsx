import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddSchedule from './modals/AddSchedule';
import tripApi from '../apis/trip';

// 로케일 설정
LocaleConfig.locales.kr = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'kr';

// 날짜 사이 범위 생성 함수
const getDateRange = (start, end) => {
  const range = {};
  const startDate = new Date(start);
  const endDate = new Date(end);

  let current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    range[dateStr] = { marked: true };
    current.setDate(current.getDate() + 1);
  }

  return range;
};

const CalendarSection = ({ selectedDate, setSelectedDate, accessToken }) => {
  const [schedules, setSchedules] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ 여행 데이터 불러오기
  useEffect(() => {
    const fetchAllTrips = async () => {
    try {
      const trips = await tripApi.getAllTrips(); // 모든 여행 가져오기
      console.log("여행 목록:", trips);
      setSchedules(trips);
    } catch (error) {
      console.error('일정 로드 실패:', error);
    }
  };

  fetchAllTrips();
  }, []);

  const handleAddSchedule = async (newSchedule) => {
    const formattedSchedule = {
      ...newSchedule,
      start_date: newSchedule.start_date.toISOString().split('T')[0],
      end_date: newSchedule.end_date.toISOString().split('T')[0],
    };

    try {
      const savedTrip = await tripApi.addTrip(accessToken, formattedSchedule);
      setSchedules(prev => [...prev, savedTrip]);
      setModalVisible(false);
      setSelectedDate(formattedSchedule.start_date);
    } catch (error) {
      Alert.alert('오류', '일정 추가 실패');
    }
  };

  const markedDates = schedules.reduce((acc, schedule) => {
  const start = schedule.start_date;
  const end = schedule.end_date;
  const color = schedule.color || '#70d7c7';

  const current = new Date(start);
  const endDate = new Date(end);

  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];

    acc[dateStr] = {
      ...(acc[dateStr] || {}),
      color,
      textColor: 'white',
      startingDay: dateStr === start,
      endingDay: dateStr === end,
    };

    current.setDate(current.getDate() + 1);
  }

  return acc;
}, {});

// 선택된 날짜가 markedDates에 없으면 기본 마킹 추가
if (!markedDates[selectedDate]) {
  markedDates[selectedDate] = {
    startingDay: true,
    endingDay: true,
    color: '#ffffff',
    textColor: '#0048FF',
  };
}

  // ✅ 날짜 클릭 시 해당 일정 정보 알림 표시
  const handleDayPress = (day) => {
    const clickedDate = day.dateString;
    setSelectedDate(clickedDate);

    const match = schedules.find(
      (schedule) => clickedDate >= schedule.start_date && clickedDate <= schedule.end_date
    );

    if (match) {
      Alert.alert(
        `${match.name}`,
        `국가: ${match.country}\n기간: ${match.start_date} ~ ${match.end_date}\n동행자 수: ${match.companions}`,
      );
    }
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType="period"
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: '#333',
          selectedDayTextColor: '#fff',
          todayTextColor: '#000',
          dayTextColor: '#000',
          monthTextColor: '#000',
          arrowColor: '#BDBDBD',
          textMonthFontSize: 20,
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textDayFontWeight: '500',
          textDayHeaderFontWeight: '600',
        }}
        renderHeader={(date) => {
          const year = date.getFullYear();
          const month = date.getMonth();
          const monthName = LocaleConfig.locales.kr.monthNames[month];

          return (
            <View
              style={{
                width: '82%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                gap: 70,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                }}
              >
                {`${year}년 ${monthName}`}
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {/* <AntDesign name="pluscircleo" size={17} color="#000" /> */}
                <Text style={{ fontSize: 20, color: '#000' }}>+</Text>
              </TouchableOpacity>

              <AddSchedule
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleAddSchedule}
              />
            </View>
          );
        }}
        firstDay={0}
        hideExtraDays={true}
        enableSwipeMonths={true}
      />
    </View>
  );
};

export default CalendarSection;
