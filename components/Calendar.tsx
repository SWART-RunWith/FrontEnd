import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const { width } = Dimensions.get('window');

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const dummyRunningDates: Record<string, string[]> = {
  '2024-10': ['2024-10-04', '2024-10-07', '2024-10-12'],
  '2024-11': ['2024-11-05', '2024-11-10'],
};

const isToday = (year: number, month: number, day: number) => {
  return moment([year, month - 1, day]).isSame(moment(), 'day');
};

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

export const CustomCalendar = forwardRef((props: any, ref) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const year = currentMonth.year();
  const month = currentMonth.month() + 1;

  const calendar = generateCalendar(year, month);

  useImperativeHandle(ref, () => ({
    handleSwipe: (dy: number) => {
      let newMonth = currentMonth.month() + 1;
      let newYear = currentMonth.year();

      if (dy > 0) {
        setCurrentMonth(moment(currentMonth).subtract(1, 'month'));
        newMonth = currentMonth.month();
        newYear = currentMonth.year();
      } else {
        setCurrentMonth(moment(currentMonth).add(1, 'month'));
        newMonth = currentMonth.month() + 2;
        newYear = currentMonth.year();
      }

      fetchRunningDates(newMonth, newYear);
    },
  }));

  const fetchRunningDates = async (newMonth: number, newYear: number) => {
    const formattedMonth = `${newYear}-${newMonth.toString().padStart(2, '0')}`;
    const apiDates = dummyRunningDates[formattedMonth] || [];
    setSelectedDates(apiDates);
    props.onUpdateRunningCount(apiDates);
  };

  const handleDayPress = (day: number) => {
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.title}>
        <Text style={styles.year}>{year}</Text>
        <Text style={styles.month}>{month}월</Text>
      </View>

      <View style={styles.weekdayContainer}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {calendar.map((week, index) => (
          <View key={index} style={styles.weekContainer}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={styles.dayCell}
                onPress={() => day !== null && handleDayPress(day)}
                disabled={day === null}
              >
                {day && isToday(year, month, day) && <View style={styles.todayCell} />}

                {day && selectedDates.includes(moment([year, month - 1, day]).format('YYYY-MM-DD')) && (
                  <View style={styles.selectedDayCell} />
                )}

                <Text
                  style={[
                    styles.dayText,
                    day !== null && isToday(year, month, day) && { color: 'black' },
                  ]}
                >
                  {day || ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
});

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
    justifyContent: 'space-around',
    marginTop: getSize(20.8),
  },
  weekdayText: {
    textAlign: 'center',
    height: getSize(46.8),
    width: getSize(46.8),
    fontSize: getSize(14),
    fontFamily: Fonts.medium,
    color: '#B3B3B3',
  },
  calendarGrid: {
    flexDirection: 'column',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayCell: {
    width: getSize(46.8),
    height: getSize(46.8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCell: {
    position: 'absolute',
    backgroundColor: Colors.main,
    borderRadius: 100,
    height: getSize(30),
    width: getSize(30),
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
