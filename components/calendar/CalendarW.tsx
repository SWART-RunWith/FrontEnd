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

const generateWeekDays = (currentDate: moment.Moment) => {
  const startOfWeek = moment(currentDate).subtract(3, 'days');
  return Array.from({ length: 7 }).map((_, index) =>
    moment(startOfWeek).add(index, 'days')
  );
};

const isTodayW = (day: moment.Moment) => {
  return moment().isSame(day, 'day');
};

export const CustomCalendarW = ({
  selectedDates,
  selectedDate,
}: any) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || moment());
  const [weekDays, setWeekDays] = useState(generateWeekDays(currentDate));
  const translateX = useRef(new Animated.Value(0)).current;

  const fetchDateData = async (date: moment.Moment) => {
    apiClient.get(`/${date.format('YYYY-MM-DD')}`)
      .then(response => {
        console.log('API 응답:', response.data);
      })
      .catch(error => {
        console.error('API 요청 실패:', error);
      });
  };

  let swipeInterval: NodeJS.Timeout | null = null;

  const handleSwipe = (dx: number) => {
    const newDate = dx > 0
      ? moment(currentDate).add(1, 'days')
      : moment(currentDate).subtract(1, 'days');
    setCurrentDate(newDate);
    setWeekDays(generateWeekDays(newDate));
  };

  const stopSwipeAndFetch = () => {
    const middleDate = weekDays[3];
    fetchDateData(middleDate);
  };

  const handleDayPress = (day: moment.Moment) => {
    setCurrentDate(day);
    setWeekDays(generateWeekDays(day));

    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      stopSwipeAndFetch();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = width / 3;
        if (gestureState.dx < -threshold) {
          Animated.timing(translateX, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            handleSwipe(1);
            translateX.setValue(0);
          });
        } else if (gestureState.dx > threshold) {
          Animated.timing(translateX, {
            toValue: width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            handleSwipe(-1);
            translateX.setValue(0);
          });
        } else {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }

        stopSwipeAndFetch();
      },
    })
  ).current;

  return (
    <View style={styles.calendarContainer} {...panResponder.panHandlers}>
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
        <Text style={styles.year}>{currentDate.year()}</Text>
        <Text style={styles.month}>{currentDate.month() + 1}월</Text>
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
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              onPress={() => { handleDayPress(day) }}
            >
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