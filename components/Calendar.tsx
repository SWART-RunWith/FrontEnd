import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import moment from 'moment';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const generateCalendar = (year: number, month: number) => {
  const startOfMonth = moment([year, month - 1]);
  const endOfMonth = moment(startOfMonth).endOf('month');

  const calendar = [];
  let week = [];

  for (let i = 0; i < startOfMonth.day() - 1; i++) {
    week.push(null);
  }

  for (let day = 1; day <= endOfMonth.date(); day++) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);
  }

  return calendar;
};

export const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState('');

  const year = currentMonth.year();
  const month = currentMonth.month() + 1;

  const calendar = generateCalendar(year, month);

  const handleDayPress = (day: number) => {
    if (day) {
      const selected = moment([year, month - 1, day]).format('YYYY-MM-DD');
      setSelectedDate(selected);
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.title}>{year}년 {month}월</Text>

      {/* 요일 헤더 */}
      <View style={styles.weekdayContainer}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* 날짜 셀 */}
      <View style={styles.calendarGrid}>
        {calendar.map((week, index) => (
          <View key={index} style={styles.weekContainer}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={[
                  styles.dayCell,
                  day && moment([year, month - 1, day]).isSame(moment(), 'day') ? styles.todayCell : null,
                  day && moment([year, month - 1, day]).format('YYYY-MM-DD') === selectedDate ? styles.selectedDayCell : null
                ]}
                onPress={() => handleDayPress(day ?? 0)}
                disabled={!day}
              >
                <Text style={day ? styles.dayText : styles.emptyDayText}>
                  {day || ''}
                </Text>
                {day && moment([year, month - 1, day]).isSame(moment('2024-10-04'), 'day') && (
                  <View style={styles.dot} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: getSize(10),
    paddingVertical: getSize(20),
    width: width - getSize(32),
    alignSelf: 'center',
  },
  title: {
    color: Colors.main,
    fontSize: getSize(36),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: getSize(16),
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: getSize(16),
  },
  weekdayText: {
    fontSize: getSize(16),
    color: '#A3A3A3',
  },
  calendarGrid: {
    flexDirection: 'column',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: getSize(10),
  },
  dayCell: {
    width: getSize(40),
    height: getSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize(20),
  },
  todayCell: {
    backgroundColor: Colors.main,
  },
  selectedDayCell: {
    backgroundColor: Colors.main,
    borderRadius: getSize(20),
  },
  dayText: {
    fontSize: getSize(16),
    color: '#FFFFFF',
  },
  emptyDayText: {
    fontSize: getSize(16),
    color: '#666666',
  },
  dot: {
    width: getSize(4),
    height: getSize(4),
    backgroundColor: Colors.main,
    borderRadius: getSize(2),
    marginTop: getSize(4),
  },
});
