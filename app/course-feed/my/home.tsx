import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CourseMyHomeHeader } from '@/components/header/IconHeader';
import { MyCourseBox } from '@/components/box/CourseFeed';
import { FolderButton } from '@/components/button/FolderButton';
import { MainGradient } from '@/components/Gradient';
import Fonts from '@/constants/Fonts';
import Styles from '@/constants/Styles';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import { CourseFeedScreenNavigationProp } from '@/scripts/navigation';
import { FolderContainer } from '@/components/FolderContainer';

const { width } = Dimensions.get('window');

const MyCourseHomeScreen = () => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  const [visibleLeft, setVisibleLeft] = useState(1);
  const [visibleMiddle, setVisibleMiddle] = useState(2);
  const [visibleRight, setVisibleRight] = useState(1);

  const scaleLeftAnim = useRef(new Animated.Value(visibleLeft === 2 ? 1 : (visibleLeft === 1 ? 0.87 : 0.75))).current;
  const scaleMiddleAnim = useRef(new Animated.Value(visibleMiddle === 2 ? 1 : (visibleMiddle === 1 ? 0.87 : 0.75))).current;
  const scaleRightAnim = useRef(new Animated.Value(visibleRight === 2 ? 1 : (visibleRight === 1 ? 0.87 : 0.75))).current;

  const translateLeftAnim = useRef(new Animated.Value(0)).current;
  const translateRightAnim = useRef(new Animated.Value(0)).current;
  const translateMiddleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateBoxes();
  }, [visibleLeft, visibleMiddle, visibleRight]);

  const handlePressLeft = () => {
    if (visibleLeft === 2) return;

    if (visibleMiddle === 2) {
      setVisibleLeft(2);
      setVisibleMiddle(1);
      setVisibleRight(0);
    } else if (visibleRight === 2) {
      setVisibleLeft(1);
      setVisibleMiddle(2);
      setVisibleRight(1);
    }

    animateBoxes();
  };

  const handlePressRight = () => {
    if (visibleRight === 2) return;

    if (visibleMiddle === 2) {
      setVisibleRight(2);
      setVisibleMiddle(1);
      setVisibleLeft(0);
    } else if (visibleLeft === 2) {
      setVisibleRight(1);
      setVisibleMiddle(2);
      setVisibleLeft(1);
    }

    animateBoxes();
  };

  const animateBoxes = () => {
    Animated.parallel([
      // left 
      Animated.timing(scaleLeftAnim, {
        toValue: visibleLeft === 2 ? 1 : (visibleLeft === 1 ? 0.87 : 0.75),
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateLeftAnim, {
        toValue: visibleLeft === 2 ? 0 : (visibleLeft === 1 ? getSize(-20) : getSize(-45)),
        duration: 500,
        useNativeDriver: true,
      }),

      // middle
      Animated.timing(scaleMiddleAnim, {
        toValue: visibleMiddle === 2 ? 1 : (visibleMiddle === 1 ? 0.87 : 0.75),
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateMiddleAnim, {
        toValue: visibleMiddle === 2 ? 0 : (visibleLeft === 2 ? getSize(25) : getSize(-25)),
        duration: 500,
        useNativeDriver: true,
      }),

      // right
      Animated.timing(scaleRightAnim, {
        toValue: visibleRight === 2 ? 1 : (visibleRight === 1 ? 0.87 : 0.75),
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateRightAnim, {
        toValue: visibleRight === 2 ? 0 : (visibleRight === 1 ? getSize(20) : getSize(45)),
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const bestCourseList = [
    { id: 1, location: '광교 호수 공원', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQe0ifbh7K_27rscADoKrarCpBfO36WFk9A&s' },
    { id: 2, location: '남산 둘레길', imgUrl: 'https://www.ktsketch.co.kr/news/photo/202006/5978_26907_50.jpg' },
    { id: 3, location: '한강', imgUrl: 'https://i.namu.wiki/i/t2zvEe7ws93H0jrNgi_6co5wMkXToxQuGkmO7AhHbMrhPBSY9LZwNpthQZRkWYxYBB2ZPj8M08p5vw_yOJAz_g.webp' },
  ];

  const folderList = [
    { name: '서천동', id: 1 },
    { name: '봉천동', id: 2 },
    { name: '대학로', id: 3 },
    { name: '홍대입구', id: 4 },
  ]

  const goHome = () => {
    navigation.navigate('home');
  };

  return (
    <View style={Styles.container}>
      <MainGradient />

      <CourseMyHomeHeader
        backProps={{
          onPress: () => { goHome(); }
        }}
      />

      <View style={styles.textContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>나의 러닝 코스</Text>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>내가 그린 나의 코스를 공유하고 뛰어보세요.</Text>
        </View>
      </View>

      <View style={styles.courseBoxesContainer}>
        <Animated.View style={[
          styles.leftBox,
          {
            transform: [{ scale: scaleLeftAnim }, { translateX: translateLeftAnim }]
          },
          { zIndex: visibleLeft === 2 ? 3 : (visibleLeft === 1 ? 2 : 1) }
        ]}>
          <MyCourseBox
            imgUrl={bestCourseList[0].imgUrl}
            location={bestCourseList[0].location}
            status={visibleLeft}
            onPress={() => { }}
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
          />
        </Animated.View>

        <Animated.View style={[
          styles.middleBox,
          {
            transform: [{ scale: scaleMiddleAnim }, { translateX: translateMiddleAnim }]
          },
          { zIndex: visibleMiddle === 2 ? 3 : (visibleMiddle === 1 ? 2 : 1) }
        ]}>
          <MyCourseBox
            imgUrl={bestCourseList[1].imgUrl}
            location={bestCourseList[1].location}
            status={visibleMiddle}
            onPress={() => { }}
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
          />
        </Animated.View>

        <Animated.View style={[
          styles.rightBox,
          {
            transform: [{ scale: scaleRightAnim }, { translateX: translateRightAnim }]
          },
          { zIndex: visibleRight === 2 ? 3 : (visibleRight === 1 ? 2 : 1) }
        ]}>
          <MyCourseBox
            imgUrl={bestCourseList[2].imgUrl}
            location={bestCourseList[2].location}
            status={visibleRight}
            onPress={() => { }}
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
          />
        </Animated.View>
      </View>

      <View style={{ marginTop: getSize(24) }}>
        <TouchableOpacity
          style={{ height: getSize(24) }}
          onPress={() => { navigation.navigate('course-feed/my/folder'); }}
        >
          <Text style={styles.folderTitle}>내 폴더</Text>
        </TouchableOpacity>
        <FolderContainer
          folderList={folderList}
          onFolderPress={(folderId: number) => {
            navigation.navigate('course-feed/my/course', { folderId });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginTop: getSize(31),
    width: width,
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  titleWrapper: {
    height: getSize(36),
  },
  descriptionWrapper: {
    height: getSize(17),
    marginTop: getSize(4),
  },
  title: {
    fontFamily: Fonts.black,
    fontSize: getSize(30),
    color: 'black',
  },
  description: {
    fontFamily: Fonts.medium,
    fontSize: getSize(14),
    color: 'black',
  },
  courseBoxesContainer: {
    position: 'relative',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: getSize(43),
    height: getSize(310),
    width: width,
  },
  box: {
    width: getSize(250),
    height: getSize(310),
  },
  leftBox: {
    position: 'absolute',
    left: getSize(16),
  },
  middleBox: {
    position: 'absolute',
    left: width / 2 - getSize(125),
  },
  rightBox: {
    position: 'absolute',
    right: getSize(16)
  },
  folderContainer: {
    marginTop: getSize(24),
    paddingHorizontal: getSize(16),
    width: width,
  },
  folderTitle: {
    paddingHorizontal: getSize(16),
    color: 'white',
    fontSize: getSize(20),
    fontFamily: Fonts.bold,
  },
  folderList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: getSize(24),
  },
  folderWrapper: {
    width: (width - getSize(Sizes.formMargin * 2)) / 2 - 7,
    marginBottom: getSize(18),
  },
});

export default MyCourseHomeScreen;
