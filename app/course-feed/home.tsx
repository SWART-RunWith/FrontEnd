import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Styles from '@/constants/Styles';
import getSize from "@/scripts/getSize";
import { CourseFeedMainHeader } from "@/components/header/IconHeader";
import { MainCourseBox } from '@/components/box/CourseFeed';
import Fonts from '@/constants/Fonts';

const { width } = Dimensions.get('window');

const CourseFeedHomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handlePress = () => { };
  const plusCourse = (courseId: number) => {
    // 코스 추가하는 API 적용
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * SNAP_INTERVAL, animated: true });
  };

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
                  onPress={handlePress}
                  onPressButton={handlePress}
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
              { opacity: activeIndex === index ? 1 : 0.3 }
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
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
    backgroundColor: '#fff',
  },
});

export default CourseFeedHomeScreen;
