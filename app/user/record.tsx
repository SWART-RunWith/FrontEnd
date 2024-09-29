import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import BackIcon from '@/assets/icons/back.svg';
import CalendarIcon from '@/assets/icons/calendar_m.svg';
import Styles from '@/constants/Styles';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import BottomTab from '@/components/BottomTab';
import { CustomCalendarM, CustomCalendarW } from '@/components/Calendar';
import getSize from '@/scripts/getSize';

const { width } = Dimensions.get('window');

const dummyRunningDates: Record<string, string[]> = {
  '2024-07': ['2024-07-05', '2024-07-10'],
  '2024-08': ['2024-08-04', '2024-08-07', '2024-08-12'],
  '2024-09': ['2024-09-04', '2024-09-07', '2024-09-12', '2024-09-29'],
};

const RecordScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState('홍여준');
  const [count, setCount] = useState(0);
  const [isWeekMode, setIsWeekMode] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(moment());

  const [isSwiping, setIsSwiping] = useState(false);

  const fetchRunningDates = async (newMonth: number, newYear: number) => {
    const formattedMonth = `${newYear}-${newMonth.toString().padStart(2, '0')}`;
    const apiDates = dummyRunningDates[formattedMonth] || [];
    setSelectedDates(apiDates);
    setCount(apiDates.length);
  };

  useEffect(() => {
    fetchRunningDates(currentMonth.month() + 1, currentMonth.year());
  }, [currentMonth]);

  const handleSwipe = (dy: number) => {
    if (!isSwiping) {
      setIsSwiping(true);

      if (dy > 0) {
        setCurrentMonth((prev) => moment(prev).subtract(1, 'month'));
      } else {
        setCurrentMonth((prev) => moment(prev).add(1, 'month'));
      }

      setTimeout(() => {
        setIsSwiping(false);
      }, 500);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (isWeekMode) {
          return false
        };
        return Math.abs(gestureState.dy) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!isSwiping && !isWeekMode) {
          handleSwipe(gestureState.dy);
        }
      },
    })
  ).current;

  return (
    <View style={Styles.container}>
      <View style={styles.firstR} />
      <View style={styles.secondR} />

      <View style={styles.topContainer} {...(!isWeekMode ? panResponder.panHandlers : {})}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.iconContainer, { justifyContent: 'flex-start' }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon width={getSize(13.85)} height={getSize(26)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconContainer, { justifyContent: 'flex-end' }]}
            onPress={() => setIsWeekMode(!isWeekMode)}
          >
            <CalendarIcon width={getSize(24)} height={getSize(26)} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: getSize(21) }} />
        {isWeekMode ? (
          <CustomCalendarW
            selectedDates={selectedDates}
            currentMonth={currentMonth}
          />
        ) : (
          <CustomCalendarM
            selectedDates={selectedDates}
            currentMonth={currentMonth}
          />
        )}
      </View>

      <View style={styles.textBox}>
        <View style={styles.textRow}>
          <Text style={styles.text}>{user}님, 이번 달 총 </Text>
          <Text style={[styles.text, { color: Colors.main }]}>{count}번</Text>
          <Text style={styles.text}> 뛰셨어요.</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.runwith}>RUNWITH</Text>
          <Text style={styles.text}>과 더 힘차게 달려볼까요?</Text>
        </View>
      </View>

      <BottomTab route="Record" reload={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: getSize(29),
    marginTop: getSize(58),
    paddingHorizontal: getSize(16),
  },
  firstR: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: getSize(6),
    },
    shadowRadius: 5.5,
    elevation: 5.5,
    shadowOpacity: 1,
    position: 'absolute',
    backgroundColor: '#181818',
    height: getSize(475),
    width: width - getSize(58),
    top: getSize(95),
    left: getSize(29),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  secondR: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: getSize(6),
    },
    shadowRadius: 5.5,
    elevation: 5.5,
    shadowOpacity: 1,
    position: 'absolute',
    backgroundColor: '#181818',
    height: getSize(488),
    width: width - getSize(390 - 302),
    top: getSize(95),
    left: getSize(44),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topContainer: {
    backgroundColor: '#1B1B1B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: getSize(6),
    },
    shadowRadius: 5.5,
    elevation: 5.5,
    shadowOpacity: 1,
    width: width,
    height: getSize(552),
  },
  iconContainer: {
    width: getSize(24),
  },
  textBox: {
    backgroundColor: Colors.grayBox,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: getSize(110),
    width: width - getSize(80),
    marginTop: getSize(55),
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.medium,
  },
  runwith: {
    color: Colors.main,
    fontSize: getSize(16),
    fontFamily: Fonts.hanson,
  },
});

export default RecordScreen;
