import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder
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

const isToday = (year: number, month: number, day: number) => {
  return moment([year, month - 1, day]).isSame(moment(), 'day');
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
                {day &&
                  <View style={isToday(year, month, day) && styles.today} >
                    <Text style={[
                      styles.dayText,
                      isToday(year, month, day) && { color: 'black' }
                    ]}>{day || ''}</Text>
                  </View>
                }
                {day && selectedDates.includes(moment([year, month - 1, day]).format('YYYY-MM-DD')) && (
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
  today: {
    backgroundColor: Colors.main,
    height: getSize(30),
    width: getSize(30),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const generateWeekDays = (currentDate: moment.Moment) => {
  const startOfWeek = moment(currentDate).subtract(3, 'days');
  return Array.from({ length: 7 }).map((_, index) =>
    moment(startOfWeek).add(index, 'days')
  );
};

const isTodayW = (day: moment.Moment) => {
  return moment().isSame(day, 'day');
};

export const CustomCalendarW = ({ selectedDates, currentMonth }: any) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [weekDays, setWeekDays] = useState(generateWeekDays(currentDate));

  const handleSwipe = (dx: number) => {
    const newDate = dx > 0 ? moment(currentDate).subtract(1, 'days') : moment(currentDate).add(1, 'days');
    setCurrentDate(newDate);
    setWeekDays(generateWeekDays(newDate));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 0) {
          handleSwipe(-1);
        } else {
          handleSwipe(1);
        }
      },
    })
  ).current;

  return (
    <View style={styles.calendarContainer} {...panResponder.panHandlers}>
      <View style={styles.title}>
        <Text style={styles.year}>{currentMonth.year()}</Text>
        <Text style={styles.month}>{currentMonth.month() + 1}월</Text>
      </View>

      <View style={styles.calendarGrid}>
        <View style={styles.weekdayContainer}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekdayText}>
              {daysOfWeek[day.day() === 0 ? 6 : day.day() - 1]}
            </Text>
          ))}
        </View>

        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity key={index} style={styles.dayCell}>
              <View style={isTodayW(day) && styles.today} >
                <Text style={[
                  styles.dayText,
                  isTodayW(day) && { color: 'black' }
                ]}>{day.date()}</Text>
              </View>
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