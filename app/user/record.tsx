import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '@/assets/icons/back.svg';
import CalendarIcon from '@/assets/icons/calendar_m.svg';
import Styles from '@/constants/Styles';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import BottomTab from '@/components/BottomTab';
import { CustomCalendar } from '@/components/Calendar';
import getSize from '@/scripts/getSize';

const { width } = Dimensions.get('window');

interface CustomCalendarRef {
  handleSwipe: (dy: number) => void;
}

const RecordScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState('홍여준');
  const [count, setCount] = useState(3);

  const calendarRef = useRef<CustomCalendarRef>(null); // CustomCalendar를 참조하기 위한 ref

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        // 스와이프 동작을 CustomCalendar로 전달
        if (calendarRef.current) {
          calendarRef.current.handleSwipe(gestureState.dy);
        }
      },
    })
  ).current;

  return (
    <View style={Styles.container}>
      <View style={styles.firstR} />
      <View style={styles.secondR} />

      <View style={styles.topContainer} {...panResponder.panHandlers}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.iconContainer, { justifyContent: 'flex-start' }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon width={getSize(13.85)} height={getSize(26)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconContainer, { justifyContent: 'flex-end' }]}
          >
            <CalendarIcon width={getSize(24)} height={getSize(26)} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: getSize(21) }} />
        <CustomCalendar ref={calendarRef} />
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

      <BottomTab route='Record' reload={false} />
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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 6
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
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 6
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
      height: 6
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
  title: {
    color: Colors.main,
    fontSize: getSize(24),
    fontWeight: 'bold',
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
