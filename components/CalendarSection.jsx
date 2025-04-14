import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';

LocaleConfig.locales.kr = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};

LocaleConfig.defaultLocale = 'kr';

const CalendarSection = ({ selectedDate, setSelectedDate }) => {

  return (
    <View>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#ffffff',
            disableTouchEvent: false,
            selectedTextColor: '#0048FF',
          },
        }}
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
          const month = date.getMonth(); // 0~11
          const monthName = LocaleConfig.locales.kr.monthNames[month];
          return (
            <View style={{
             
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 116,
            }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                }}
              >
                {`${year}년 ${monthName} `}
              </Text>

              {/* 오른쪽 일정 추가 버튼 */}
              <TouchableOpacity onPress={() => console.log('일정 추가')}>
                <AntDesign
                  name="pluscircleo"
                  size={17}
                  color="#000" />
              </TouchableOpacity>
            </View>
          );
        }}
        firstDay={0}
        hideExtraDays={true}
        enableSwipeMonths={true}
      />
    </View>
  )
};

export default CalendarSection
