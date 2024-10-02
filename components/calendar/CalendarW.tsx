import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import moment from "moment";
import apiClient from "@/axois";

import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import getSize from "@/scripts/getSize";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const generateExtraDays = (currentDate: moment.Moment, days = 30) => {
  const startDate = moment(currentDate).subtract(days, 'days');
  return Array.from({ length: days * 2 + 1 }).map((_, index) =>
    moment(startDate).add(index, 'days')
  );
};

const isTodayW = (day: moment.Moment) => {
  return moment().isSame(day, 'day');
};

export const CustomCalendarW = ({
  selectedDates,
  selectedDate,
  setSelectedDate,
}: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [weekDays, setWeekDays] = useState(generateExtraDays(selectedDate));
  const dayWidth = getSize(46.8);
  const bufferDays = 30;
  const paddingHorizontal = (width - dayWidth) / 2;
  const threshold = 5;

  const expandDays = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      const newDays = generateExtraDays(weekDays[0], bufferDays);
      setWeekDays((prev) => [...newDays, ...prev]);
    } else if (direction === 'right') {
      const lastDate = weekDays[weekDays.length - 1];
      const newDays = generateExtraDays(lastDate.add(1, 'days'), bufferDays);
      setWeekDays((prev) => [...prev, ...newDays]);
    }
  };

  const scrollToIndex = (index: number, animated = true) => {
    const offset = index * dayWidth - paddingHorizontal;
    scrollViewRef.current?.scrollTo({ x: offset, animated });
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      const selectedIndex = weekDays.findIndex((day) => day.isSame(selectedDate, 'day'));
      const centerIndex = selectedIndex !== -1 ? selectedIndex : bufferDays;
      setTimeout(() => {
        scrollToIndex(centerIndex, false);
      }, 0);
    }
  }, [selectedDate]);

  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x + paddingHorizontal;
    const centerIndex = Math.round(contentOffsetX / dayWidth);

    if (centerIndex <= threshold) {
      expandDays('left');
    } else if (centerIndex >= weekDays.length - threshold) {
      expandDays('right');
    }

    const newDate = weekDays[centerIndex];

    console.log(newDate);

    setSelectedDate(newDate);

    scrollToIndex(centerIndex);
  };

  const handleDaySelect = (day: moment.Moment) => {
    setSelectedDate(day);
    console.log(day);

    const index = weekDays.findIndex(d => d.isSame(day, 'day'));
    if (index !== -1) {
      scrollToIndex(index);
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <LinearGradient
        colors={['rgba(27, 27, 27, 1)', 'transparent']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.leftGradient}
        pointerEvents="none"
      />

      <LinearGradient
        colors={['transparent', 'rgba(27, 27, 27, 1)']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.rightGradient}
        pointerEvents="none"
      />

      <View style={styles.title}>
        <Text style={styles.year}>{selectedDate.year()}</Text>
        <Text style={styles.month}>{selectedDate.month() + 1}월</Text>
      </View>

      <View style={styles.calendarGrid}>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          snapToInterval={getSize(46.8)}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          contentContainerStyle={styles.scrollViewContent}
        >
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayWrapper}>
              {/* 요일 */}
              <Text style={styles.weekdayText}>
                {daysOfWeek[day.day() === 0 ? 6 : day.day() - 1]}
              </Text>

              {/* 날짜 */}
              <TouchableOpacity
                style={styles.dayCell}
                onPress={() => handleDaySelect(day)}
              >
                <View style={isTodayW(day) && styles.today} >
                  <Text style={[
                    styles.dayText,
                    isTodayW(day) && { color: 'black' }
                  ]}>
                    {day.date()}
                  </Text>
                </View>
                {selectedDates.includes(day.format('YYYY-MM-DD')) && (
                  <View style={styles.selectedDayCell} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#1B1B1B',
    width: width,
    paddingHorizontal: getSize(7.8),
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
    marginBottom: getSize(20.8),
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: getSize(-10),
  },
  dayWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
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
  leftGradient: {
    position: 'absolute',
    left: 0,
    top: getSize(82),
    bottom: 0,
    width: getSize(80),
    height: getSize(110),
    zIndex: 10,
  },
  rightGradient: {
    position: 'absolute',
    right: 0,
    top: getSize(82),
    bottom: 0,
    width: getSize(80),
    height: getSize(110),
    zIndex: 10,
  },
});