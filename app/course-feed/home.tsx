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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';

import NextIcon from '@/assets/icons/next.svg';
import getSize from "@/scripts/getSize";
import { BackSearchHeader, CourseFeedMainHeader } from "@/components/header/IconHeader";
import { MainCourseBox } from '@/components/box/CourseFeed';
import Styles from '@/constants/Styles';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import { CourseFeedMainScreenNavigationProp } from '@/scripts/navigation';

const { width, height } = Dimensions.get('window');

const CourseFeedHomeScreen = () => {
  const navigation = useNavigation<CourseFeedMainScreenNavigationProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

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


  const [isCourseFeedScreenVisible, setIsCourseFeedScreenVisible] = useState(false);
  const translateY = useRef(new Animated.Value(getSize(720) + statusBarHeight)).current;

  const bestCourseList = [
    { id: 1, location: '광교 호수 공원', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQe0ifbh7K_27rscADoKrarCpBfO36WFk9A&s' },
    { id: 2, location: '한강', imgUrl: 'https://i.namu.wiki/i/t2zvEe7ws93H0jrNgi_6co5wMkXToxQuGkmO7AhHbMrhPBSY9LZwNpthQZRkWYxYBB2ZPj8M08p5vw_yOJAz_g.webp' },
    { id: 3, location: '남산 둘레길', imgUrl: 'https://www.ktsketch.co.kr/news/photo/202006/5978_26907_50.jpg' },
  ];

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
        bestCourseList[0].id,
        bestCourseList[1].id,
        bestCourseList[2].id
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
        }).start(() => setIsCourseFeedScreenVisible(true));
      } else {
        Animated.timing(translateY, {
          toValue: getSize(720) + statusBarHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setIsCourseFeedScreenVisible(false));
      }
    },
  });

  const resetSwipe = () => {
    Animated.timing(translateY, {
      toValue: getSize(720) + statusBarHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsCourseFeedScreenVisible(false);
    });
  }

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('@/assets/images/course-main.png')}
        style={styles.backImg}
        blurRadius={5}
      />

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
                  imgUrl={course.imgUrl}
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

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>나의 러닝 코스</Text>
        <Image

          style={styles.bottomImg}
          source={require('@/assets/images/goCourse.png')}
        />
        <TouchableOpacity
          style={styles.arrowIcon}
          onPress={() => { navigation.navigate('course-feed/my/home') }}
        >
          <NextIcon />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.courseFeedScreen,
          { transform: [{ translateY }] }
        ]}
        {...panResponder.panHandlers}
      >
        {!isCourseFeedScreenVisible
          ? <Image source={require('@/assets/images/swipeUp.png')} />
          : <TouchableOpacity onPress={resetSwipe}>
            <Image source={require('@/assets/images/swipeDown.png')} />
          </TouchableOpacity>
        }
        <View style={[
          styles.courseFeedContainer,
          { marginTop: getSize(-1) }
        ]}>
          <View style={{ marginTop: -21 }}>
            <BackSearchHeader
              text='RUNWITH'
              fontColor={Colors.main}
              fontFamily={Fonts.hanson}
              onPressBack={resetSwipe}
              onPressSearch={() => { navigation.navigate('course-feed/search') }}
            />
          </View>
        </View>
      </Animated.View>
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
    backgroundColor: Colors.darkGrayBox,
    borderRadius: 20,
    width: width,
    height: '100%',
  },
});

export default CourseFeedHomeScreen;
