import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import moment from 'moment';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import getSize from '@/scripts/getSize';

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

export const CustomCalendarM = ({ selectedDates, currentMonth }: any) => {
  const year = currentMonth.year();
  const month = currentMonth.month() + 1;
  const calendar = generateCalendar(year, month);

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.title}>
        <Text style={styles.year}>{year}</Text>
        <Text style={styles.month}>{month}월</Text>
      </View>

      <View style={styles.calendarGrid}>
        <View style={styles.weekdayContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>

        {calendar.map((week, index) => (
          <View key={index} style={styles.weekContainer}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={styles.dayCell}
                disabled={day === null}
              >
                <Text style={styles.dayText}>{day || ''}</Text>
                {selectedDates.includes(moment([year, month - 1, day]).format('YYYY-MM-DD')) && (
                  <View style={styles.selectedDayCell} />
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
    backgroundColor: '#1B1B1B',
    width: width,
    paddingHorizontal: getSize(7.8),
    alignSelf: 'center',
  },
  title: {
    alignItems: 'center',
    width: '100%',
  },
  year: {
    color: Colors.main,
    fontSize: getSize(16),
    fontFamily: Fonts.bold,
    height: getSize(19),
  },
  month: {
    color: Colors.main,
    fontSize: getSize(50),
    fontFamily: Fonts.extraBold,
    height: getSize(60),
  },
  weekdayContainer: {
    flexDirection: 'row',
    marginTop: getSize(20.8),
  },
  weekdayText: {
    textAlign: 'center',
    height: getSize(46.8),
    width: getSize(46.8),
    fontSize: getSize(14),
    fontFamily: Fonts.medium,
    color: '#B3B3B3',
    paddingVertical: getSize(14.9),
  },
  calendarGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
  },
  dayCell: {
    width: getSize(46.8),
    height: getSize(46.8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayCell: {
    position: 'absolute',
    backgroundColor: Colors.main,
    borderRadius: getSize(100),
    bottom: 0,
    width: getSize(6),
    height: getSize(6),
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: getSize(21.45),
    fontFamily: Fonts.medium,
    height: getSize(26),
  },
});

const generateWeekDays = (currentMonth: moment.Moment) => {
  const startOfWeek = moment(currentMonth).startOf('week').add(1, 'day'); // 주 시작일 월요일 기준
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    moment(startOfWeek).add(index, 'days')
  );
  return weekDays;
};

export const CustomCalendarW = ({ selectedDates, currentMonth }: any) => {
  const year = currentMonth.year();
  const month = currentMonth.month() + 1;
  const weekDays = generateWeekDays(currentMonth);

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.title}>
        <Text style={styles.year}>{year}</Text>
        <Text style={styles.month}>{month}월</Text>
      </View>

      <View style={styles.calendarGrid}>
        <View style={styles.weekdayContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
            >
              <Text style={styles.dayText}>
                {day.date()}
              </Text>
              {selectedDates.includes(day.format('YYYY-MM-DD')) && (
                <View style={styles.selectedDayCell} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};