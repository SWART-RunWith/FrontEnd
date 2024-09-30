import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import BackIcon from '@/assets/icons/back.svg';
import CalendarIcon from '@/assets/icons/calendar_m.svg';
import RunningBarIcon from '@/assets/icons/runningBar.svg';
import RunningBarLongIcon from '@/assets/icons/runningBar_l.svg';
import BottomCircleArrowIcon from '@/assets/icons/bottomCircleArrow.svg';
import EditIcon from '@/assets/icons/edit.svg';
import UploadIcon from '@/assets/icons/upload_w.svg';
import TopArrowIcon from '@/assets/icons/topArrow.svg';
import Styles from '@/constants/Styles';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import BottomTab from '@/components/BottomTab';
import { CustomCalendarM, CustomCalendarW } from '@/components/Calendar';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

const { width } = Dimensions.get('window');

const dummyRunningDates: Record<string, string[]> = {
  '2024-07': ['2024-07-05', '2024-07-10'],
  '2024-08': ['2024-08-04', '2024-08-07', '2024-08-12'],
  '2024-09': ['2024-09-04', '2024-09-07', '2024-09-12', '2024-09-29'],
};

const runningRecords = [
  {
    time: '01:03:23',
    distance: '00.00KM',
    createdAt: '09:32',
    expanded: false,
  },
  {
    time: '01:02:15',
    distance: '05.50KM',
    createdAt: '13:02',
    expanded: false,
  },
];

const RecordScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState('홍여준');
  const [count, setCount] = useState(0);
  const [isWeekMode, setIsWeekMode] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [expandedRecords, setExpandedRecords] = useState<boolean[]>(() =>
    runningRecords.map(() => false)
  );

  const animationRefs = useRef<Animated.Value[]>([]).current;

  const [isSwiping, setIsSwiping] = useState(false);

  const fetchRunningDates = async (newMonth: number, newYear: number) => {
    const formattedMonth = `${newYear}-${newMonth.toString().padStart(2, '0')}`;
    const apiDates = dummyRunningDates[formattedMonth] || [];
    setSelectedDates(apiDates);
    setCount(apiDates.length);
  };

  const handleDaySelect = (date: moment.Moment) => {
    setSelectedDate(date);
    setIsWeekMode(true);
    triggerAnimation(true);
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
          return false;
        }
        return Math.abs(gestureState.dy) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!isSwiping && !isWeekMode) {
          handleSwipe(gestureState.dy);
        }
      },
    })
  ).current;

  const firstRHeight = useRef(new Animated.Value(getSize(475))).current;
  const secondRHeight = useRef(new Animated.Value(getSize(488))).current;
  const topContainerHeight = useRef(new Animated.Value(getSize(552))).current;

  const triggerAnimation = (toWeekMode: boolean) => {
    Animated.parallel([
      Animated.timing(firstRHeight, {
        toValue: toWeekMode ? 0 : getSize(475),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(secondRHeight, {
        toValue: toWeekMode ? 0 : getSize(488),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(topContainerHeight, {
        toValue: toWeekMode ? 348 : getSize(552),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleToggleMode = () => {
    setIsWeekMode(!isWeekMode);
    triggerAnimation(!isWeekMode);
  };

  useEffect(() => {
    animationRefs.splice(
      0,
      animationRefs.length,
      ...runningRecords.map(() => new Animated.Value(getSize(96)))
    );
  }, [runningRecords]);

  const handleToggleRecordExpansion = (index: number) => {
    const newExpandedRecords = [...expandedRecords];
    const isCurrentlyExpanded = newExpandedRecords[index];

    newExpandedRecords[index] = !isCurrentlyExpanded;
    setExpandedRecords(newExpandedRecords);

    Animated.timing(animationRefs[index], {
      toValue: newExpandedRecords[index] ? getSize(500) : getSize(96),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={Styles.container}>
      <Animated.View style={[styles.firstR, { height: firstRHeight }]} />
      <Animated.View style={[styles.secondR, { height: secondRHeight }]} />

      <Animated.View style={[styles.topContainer, { height: topContainerHeight }]}
        {...(!isWeekMode ? panResponder.panHandlers : {})}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.iconContainer, { justifyContent: 'flex-start' }]}
            onPress={() => navigation.goBack()}
          >
            <BackIcon width={getSize(13.85)} height={getSize(26)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconContainer, { justifyContent: 'flex-end' }]}
            onPress={() => handleToggleMode()}
          >
            <CalendarIcon width={getSize(24)} height={getSize(26)} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: getSize(21) }} />
        {isWeekMode ? (
          <CustomCalendarW
            selectedDates={selectedDates}
            selectedDate={selectedDate}
          />
        ) : (
          <CustomCalendarM
            selectedDates={selectedDates}
            currentMonth={currentMonth}
            onDaySelect={handleDaySelect}
          />
        )}
      </Animated.View>

      {!isWeekMode && (
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
      )}

      {isWeekMode && (
        <View style={styles.scrollContainer}>
          <Text style={styles.recordTitle}>러닝 기록</Text>

          <ScrollView contentContainerStyle={styles.runningRecordsContainer}>
            {runningRecords.map((record, index) => {
              const expandedHeight = expandedRecords[index] ? getSize(500) : getSize(96);

              return (
                <View
                  key={index}
                  style={styles.runningRecordContainer}
                >
                  {!expandedRecords[index]
                    ? <RunningBarIcon width={getSize(20)} height={getSize(96)} />
                    : <RunningBarLongIcon width={getSize(20)} height={getSize(500)} />
                  }

                  <Animated.View style={[
                    styles.runningRecord,
                    { height: expandedHeight }
                  ]}>
                    {!expandedRecords[index] ? (
                      <TouchableOpacity style={styles.bottomCircleArrowIcon} onPress={() => handleToggleRecordExpansion(index)}>
                        <BottomCircleArrowIcon width={getSize(28)} height={getSize(28)} />
                      </TouchableOpacity>
                    ) : (
                      <View style={{ zIndex: 1 }}>
                        <TouchableOpacity style={styles.editIcon}>
                          <EditIcon width={getSize(20)} height={getSize(20.32)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadIcon}>
                          <UploadIcon width={getSize(16)} height={getSize(20)} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.topArrowIcon} onPress={() => handleToggleRecordExpansion(index)}>
                          <TopArrowIcon width={getSize(22)} height={getSize(12)} />
                        </TouchableOpacity>
                      </View>
                    )}

                    <View style={{ marginTop: getSize(12), paddingLeft: getSize(18.2) }}>
                      <Text style={styles.createdAt}>{record.createdAt}</Text>
                      <Text style={styles.time}>{record.time}</Text>
                      <Text style={styles.distance}>{record.distance}</Text>
                    </View>

                    {expandedRecords[index] && (
                      <View style={styles.expandedContent}>
                        <Image
                          style={styles.courseImg}
                          source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fditoday.com%2F%25EC%25B4%2588%25EB%25B3%25B4%25EC%259E%2590%25EB%258F%2584-%25EB%25A7%2588%25EC%259D%258C-%25ED%258E%25B8%25ED%259E%2588-%25EB%258B%25AC%25EB%25A6%25B4-%25EC%2588%2598-%25EC%259E%2588%25EB%258A%2594-%25EB%259F%25AC%25EB%258B%259D-%25EC%25B6%2594%25EC%25B2%259C-%25EC%25BD%2594%25EC%258A%25A4-5%2F&psig=AOvVaw0EN7FQ4ORayWtksNJrQiK5&ust=1727715037992000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIidzZvO6IgDFQAAAAAdAAAAABAJ' }}
                        />

                        <View style={{ marginTop: getSize(15) }} />

                        <View style={styles.additionalInfoRow}>
                          <Text style={styles.additionalInfo}>페이스: 6'04"</Text>
                          <Text style={styles.additionalInfo}>평균 심박수: 111</Text>
                        </View>

                        <View style={{ marginTop: getSize(10) }} />

                        <View style={styles.additionalInfoRow}>
                          <Text style={styles.additionalInfo}>코도 상승: 6'04"</Text>
                          <Text style={styles.additionalInfo}>칼로리: 111</Text>
                        </View>
                      </View>
                    )}
                  </Animated.View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
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
  scrollContainer: {
    width: width,
    marginTop: getSize(61),
    marginBottom: getSize(90),
    paddingHorizontal: getSize(Sizes.formMargin),
    flex: 1,
  },
  recordTitle: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    height: getSize(19),
    marginBottom: getSize(12),
  },
  runningRecordsContainer: {
    width: width,
    gap: getSize(12),
    flexGrow: 1,
    paddingBottom: getSize(20),
  },
  runningRecordContainer: {
    flexDirection: 'row',
    gap: getSize(14),
    overflow: 'hidden',
  },
  runningRecord: {
    backgroundColor: Colors.grayBox,
    width: width - getSize(Sizes.formMargin * 2 + 34),
    height: getSize(96),
    borderRadius: 20,
    position: 'relative',
  },
  createdAt: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: getSize(10),
    fontFamily: Fonts.medium,
    height: getSize(12),
  },
  time: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.bold,
    height: getSize(19),
  },
  distance: {
    color: Colors.main,
    fontSize: getSize(32),
    fontFamily: Fonts.bold,
    height: getSize(38),
  },
  bottomCircleArrowIcon: {
    position: 'absolute',
    bottom: getSize(18),
    right: getSize(18),
    zIndex: 1,
  },
  expandedContent: {
    marginTop: getSize(17),
    width: width - getSize(Sizes.formMargin * 2 + 56),
    marginHorizontal: getSize(11),
  },
  courseImg: {
    backgroundColor: 'black',
    width: width - getSize(Sizes.formMargin * 2 + 56),
    height: getSize(290),
  },
  additionalInfoRow: {
    flexDirection: 'row',
    // backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  additionalInfo: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.medium,
    width: getSize(165),
    height: getSize(19),
  },
  editIcon: {
    position: 'absolute',
    top: getSize(23),
    right: getSize(52),
  },
  uploadIcon: {
    position: 'absolute',
    top: getSize(23),
    right: getSize(20),
  },
  topArrowIcon: {
    position: 'absolute',
    top: getSize(476),
    right: (width - getSize(Sizes.formMargin * 2 + 56)) / 2,
  },
});

export default RecordScreen;
