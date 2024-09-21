import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CourseMyHomeHeader } from '@/components/header/IconHeader';
import Fonts from '@/constants/Fonts';
import Styles from '@/constants/Styles';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import { HomeScreenNavigationProp } from '@/scripts/navigation';
import { CourseBox, MyCourseBox } from '@/components/box/CourseFeed';
import { CourseButton } from '@/components/button/RunningButton';
import { FolderButton } from '@/components/button/FolderButton';

const { width } = Dimensions.get('window');

const MyCourseHomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [visibleLeft, setVisibleLeft] = useState(1);
  const [visibleMiddle, setVisibleMiddle] = useState(2);
  const [visibleRight, setVisibleRight] = useState(1);

  const bestCourseList = [
    { id: 1, location: '광교 호수 공원', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQe0ifbh7K_27rscADoKrarCpBfO36WFk9A&s' },
    { id: 2, location: '광교2', imgUrl: 'https://via.placeholder.com/150' },
    { id: 3, location: '광교 3 공원', imgUrl: 'https://via.placeholder.com/150' },
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
  };

  return (
    <View style={Styles.container}>
      <LinearGradient
        colors={['rgba(176, 255, 76, 0.9)', 'transparent']}
        style={styles.gradientOverlay}
      />

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
        <View style={[
          styles.leftBox,
          visibleLeft === 0 && { left: getSize(-16) },
          visibleLeft === 1 && { left: getSize(0) },
          visibleLeft === 2 && { zIndex: 2 }
        ]}>
          <MyCourseBox
            imgUrl={bestCourseList[0].imgUrl}
            location={bestCourseList[0].location}
            onPress={() => { }}
            visible={visibleLeft}
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
          />
        </View>

        <View style={[
          styles.rightBox,
          visibleRight === 0 && { right: getSize(-16) },
          visibleRight === 1 && { right: getSize(0) },
          visibleRight === 2 && { zIndex: 2 }
        ]}>
          <MyCourseBox
            imgUrl={bestCourseList[2].imgUrl}
            location={bestCourseList[2].location}
            onPress={() => { }}
            visible={visibleRight}
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
          />
        </View>

        <View style={[
          styles.middleBox,
          visibleMiddle === 1 && visibleLeft === 0 && { left: width / 2 - getSize(150) },
          visibleMiddle === 1 && visibleRight === 0 && { left: width / 2 - getSize(105) },
          visibleMiddle === 2 && { zIndex: 2 }
        ]}>
          <MyCourseBox
            imgUrl={bestCourseList[1].imgUrl}
            location={bestCourseList[1].location}
            onPress={() => { }}
            visible={visibleMiddle}
            onPressLeft={handlePressLeft}
            onPressRight={handlePressRight}
          />
        </View>
      </View>

      <View style={styles.folderContainer}>
        <View style={{ height: getSize(24) }}>
          <Text style={styles.folderTitle}>내 폴더</Text>
        </View>
        <View style={styles.folderList}>
          {folderList.map((folder) => (
            <View key={folder.id} style={styles.folderWrapper}>
              <FolderButton
                isSelected={false}
                name={folder.name}
                count={0}
                onPress={() => { }}
              />
            </View>
          ))}
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: getSize(495),
  },
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
    marginTop: getSize(43),
    height: getSize(310),
    width: width,
    position: 'relative',
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
  }
});

export default MyCourseHomeScreen;
