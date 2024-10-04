import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  PanResponder,
  StatusBar,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';

import NextIcon from '@/assets/icons/next.svg';
import bestCourseDummyList from '@/assets/dummy/bestCourseList.json';
import courseDummyList from '@/assets/dummy/courseList.json';
import { BackSearchHeader, CourseFeedMainHeader } from "@/components/header/IconHeader";
import { MainCourseBox, MainCoursePreviewBox } from '@/components/box/CourseFeed';
import Styles from '@/constants/Styles';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from "@/scripts/getSize";
import { CourseFeedMainScreenNavigationProp } from '@/scripts/navigation';
import { BlurView } from 'expo-blur';
import BottomTab from '@/components/BottomTab';

const { width, height } = Dimensions.get('window');

interface Course {
  id: number;
  title: string;
  distance: string;
  time: string;
  author: string;
  location: string;
  description: string;
  backgroundImg: string;
}

const CourseFeedHomeScreen = () => {
  const navigation = useNavigation<CourseFeedMainScreenNavigationProp>();

  const [isPanResponderActive, setIsPanResponderActive] = useState(true);

  // 코스 데이터 가져오기
  const [courseList, setCourseList] = useState<Course[]>(courseDummyList);
  const [bestCourseList, setBestCourseList] = useState<Course[]>(bestCourseDummyList);

  useEffect(() => {
    setBestCourseList(bestCourseDummyList);
  }, []);

  useEffect(() => {
    setCourseList(courseDummyList);
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // best 코스 박스
  const CARD_WIDTH = getSize(309);
  const CARD_MARGIN = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 0.05;

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SNAP_INTERVAL);
    setActiveIndex(index);
  };

  const handlePress = (courseId: number) => {
    console.log(courseId, "로 이동");
    navigation.navigate("course-feed/detail", {
      courseId: courseId,
      courseIdList: [
        courseList[0].id,
        courseList[1].id,
        courseList[2].id
      ]
    })
  };

  const plusCourse = (courseId: number) => {
    // 코스 추가하는 API 적용
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * SNAP_INTERVAL, animated: true });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: SNAP_INTERVAL, animated: false });
    }, 0);
  }, []);

  // 하단 스와이프
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [isCourseFeedScreenVisible, setIsCourseFeedScreenVisible] = useState(false);
  const translateY = useRef(new Animated.Value(getSize(720) + statusBarHeight)).current;

  useEffect(() => {
    let calculatedHeight = 0;
    if (Platform.OS === 'android') {
      calculatedHeight = StatusBar.currentHeight ?? 20;
    } else if (Platform.OS === 'ios') {
      calculatedHeight = getStatusBarHeight(true);
      if (isIphoneX()) {
        calculatedHeight -= getBottomSpace();
      }
    }
    setStatusBarHeight(calculatedHeight);
  }, []);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: getSize(720) + statusBarHeight,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [statusBarHeight]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        return;
      }
      translateY.setValue(height + gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -100) {
        Animated.timing(translateY, {
          toValue: statusBarHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setIsCourseFeedScreenVisible(true);
          setIsPanResponderActive(false);
        });
      } else {
        Animated.timing(translateY, {
          toValue: getSize(720) + statusBarHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setIsCourseFeedScreenVisible(false));
      }
    },
  });

  useEffect(() => {
    if (!isCourseFeedScreenVisible) {
      Animated.timing(translateY, {
        toValue: getSize(720) + statusBarHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsPanResponderActive(true);
      });
    }
  }, [isCourseFeedScreenVisible]);

  const [isEndReached, setIsEndReached] = useState(false);

  const loadMoreCourses = () => {
    if (!isEndReached) {
      setTimeout(() => {
        if (courseList.length >= bestCourseDummyList.length) {
          setIsEndReached(true);
        } else {
          setCourseList(prevList => [
            ...prevList,
            ...bestCourseDummyList.slice(prevList.length, prevList.length + 3),
          ]);
        }
      }, 1500);
    }
  };

  const handlePlus = (courseId: number) => {
    // to do : 저장 api 연결
  }

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('@/assets/images/course-main.png')}
        style={styles.backImg}
        blurRadius={5}
      />

      {isCourseFeedScreenVisible && (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          intensity={60}
          tint="dark"
        />
      )}

      <CourseFeedMainHeader />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>BEST 코스</Text>
      </View>

      <View style={styles.scrollContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true, listener: handleScroll }
          )}
          scrollEventThrottle={16}
        >
          {bestCourseList.map((course, index) => {
            const inputRange = [
              (index - 1) * SNAP_INTERVAL,
              index * SNAP_INTERVAL,
              (index + 1) * SNAP_INTERVAL,
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });

            const rotate = scrollX.interpolate({
              inputRange,
              outputRange: ['-10deg', '0deg', '10deg'],
              extrapolate: 'clamp',
            });

            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-65, 0, 65],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={course.id}
                style={[
                  styles.cardContainer,
                  {
                    transform: [
                      { scale },
                      { rotate },
                      { translateX }
                    ],
                  }
                ]}
              >
                <MainCourseBox
                  onPress={() => { handlePress(course.id) }}
                  onPressButton={() => { handlePress(course.id) }}
                  onPressPlus={() => plusCourse(course.id)}
                  backgroundImg={course.backgroundImg}
                  location={course.location}
                />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </View>

      {/* 하단의 페이지 인디케이터 */}
      <View style={styles.pagination}>
        {bestCourseList.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              activeIndex === index && { backgroundColor: '#D9D9D9' }
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>


      <TouchableOpacity
        style={styles.bottomContainer}
        onPress={() => { navigation.navigate('course-feed/my/home') }}
      >
        <Text style={styles.bottomText}>나의 러닝 코스</Text>
        <Image
          style={styles.bottomImg}
          source={require('@/assets/images/goCourse.png')}
        />
        <View style={styles.arrowIcon}>
          <NextIcon />
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.courseFeedScreen,
          { transform: [{ translateY }] }
        ]}
        {...(isPanResponderActive && panResponder.panHandlers)}
      >
        {!isCourseFeedScreenVisible
          ? <Image
            style={{ marginBottom: getSize(-1) }}
            source={require('@/assets/images/swipeUp.png')}
          />
          : <TouchableOpacity
            style={{ marginBottom: getSize(-1) }}
            onPress={() => { setIsCourseFeedScreenVisible(false) }
            }>
            <Image source={require('@/assets/images/swipeDown.png')} />
          </TouchableOpacity>
        }
        <View style={styles.courseFeedContainer}>
          <View style={{ marginTop: -21 }}>
            <BackSearchHeader
              text='RUNWITH'
              fontColor={Colors.main}
              fontFamily={Fonts.hanson}
              onPressBack={() => { setIsCourseFeedScreenVisible(false) }}
              onPressSearch={() => {
                navigation.navigate('course-feed/search');
                setIsCourseFeedScreenVisible(false);
              }}
            />

            <View style={{ marginTop: getSize(24) }} />

            <FlatList
              style={{
                paddingHorizontal: getSize(Sizes.formMargin),
              }}
              data={courseList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: getSize(24) }}>
                  <MainCoursePreviewBox
                    title={item.title}
                    time={item.time}
                    description={item.description}
                    routeImg={item.backgroundImg}
                    distance={item.distance}
                    location={item.location}
                    name={item.author}
                    onPressPlus={() => { handlePlus(item.id) }}
                  />
                </View>
              )}
              onEndReached={loadMoreCourses}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      </Animated.View>

      <BottomTab route='CourseFeed' reload={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  backImg: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    height: getSize(1156),
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: getSize(16),
    height: getSize(29),
    width: '100%',
    marginTop: getSize(20),
  },
  titleText: {
    color: 'white',
    fontSize: getSize(24),
    fontFamily: Fonts.semiBold,
  },
  scrollContainer: {
    position: 'absolute',
    top: getSize(169.23),
  },
  cardContainer: {
    width: getSize(309),
    marginHorizontal: getSize(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    marginTop: getSize(355.23),
    flexDirection: 'row',
    alignSelf: 'center',
    gap: getSize(14),
  },
  dot: {
    height: getSize(7),
    width: getSize(7),
    borderRadius: 50,
    backgroundColor: '#4A4A4A',
  },
  bottomContainer: {
    backgroundColor: Colors.darkGrayBox,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: getSize(193),
    width: width - getSize(23) * 2,
    marginTop: getSize(23.77),
    borderRadius: 20,
    overflow: 'hidden',
  },
  bottomText: {
    color: 'white',
    fontSize: getSize(20),
    fontFamily: Fonts.bold,
    marginTop: getSize(22.77),
    marginLeft: getSize(18),
  },
  bottomImg: {
    width: getSize(239),
    height: getSize(185),
    resizeMode: 'contain',
  },
  arrowIcon: {
    position: 'absolute',
    right: getSize(21),
    bottom: getSize(16),
  },
  courseFeedScreen: {
    position: 'absolute',
    alignItems: 'center',
    height: height,
    width: width,
    top: 0,
    left: 0,
  },
  courseFeedContainer: {
    flex: 1,
    backgroundColor: Colors.darkGrayBox,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: width,
    paddingBottom: getSize(200),
  },
});

export default CourseFeedHomeScreen;
