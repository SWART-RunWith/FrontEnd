import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Styles from '@/constants/Styles';
import getSize from "@/scripts/getSize";
import { BackOptionHeader } from "@/components/header/IconHeader";
import { MainCourseBox } from '@/components/box/CourseFeed';

const { width } = Dimensions.get('window');

const CourseFeedHomeScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const bestCourseList = [
    { id: 1, location: '광교 호수 공원', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQe0ifbh7K_27rscADoKrarCpBfO36WFk9A&s' },
    { id: 2, location: '광교2', imgUrl: 'https://via.placeholder.com/150' },
    { id: 3, location: '광교 3 공원', imgUrl: 'https://via.placeholder.com/150' },
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  const handlePress = () => { };
  const plusCourse = (courseId: number) => {
    // long으로 코스 추가하는 api 적용
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('@/assets/images/course-main.png')}
        style={styles.backImg}
        blurRadius={5}
      />

      <BackOptionHeader
        onPressBack={() => { }}
        onPressOption={() => { }}
      />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {bestCourseList.map((course, index) => (
          <View key={course.id} style={styles.cardContainer}>
            <MainCourseBox
              onPress={handlePress}
              onPressButton={handlePress}
              onPressPlus={() => plusCourse(course.id)}
              imgUrl={course.imgUrl}
              location={course.location}
            />
          </View>
        ))}
      </ScrollView>

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
  scrollView: {
    flexGrow: 0,
    height: 300,
  },
  cardContainer: {
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
});

export default CourseFeedHomeScreen;
