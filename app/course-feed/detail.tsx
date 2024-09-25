import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import LeftArrowIcon from '@/assets/icons/back.svg';
import RightArrowIcon from '@/assets/icons/rightArrow.svg';
import bestCourseList from '@/assets/dummy/bestCourseList.json';
import Styles from "@/constants/Styles";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import {
  CourseFeedMainScreenNavigationProp,
  CourseFeedMainScreenRouteProp
} from "@/scripts/navigation";
import { useEffect, useState } from "react";
import { MainCourseDetailBox } from "@/components/box/CourseFeed";
import { BackSearchHeader } from "@/components/header/IconHeader";

const { width } = Dimensions.get('window');

const CourseFEedDetailScreen = () => {
  const navigation = useNavigation<CourseFeedMainScreenNavigationProp>();
  const route = useRoute<CourseFeedMainScreenRouteProp>();
  const { courseIdList, courseId } = route.params;

  const initialIndex = bestCourseList.findIndex(course => course.id === courseId);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(initialIndex !== -1 ? initialIndex : 0);

  // to do : 베스트 코스 리스트 상세 정보 조회 api 연결
  useEffect(() => {

  })

  // dummy
  const courseData = bestCourseList[currentCourseIndex];

  const handleRunButton = (courseId: number) => {

  }

  const handlePlusButton = (courseId: number) => {

  }

  const handleNextCourse = () => {
    setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % bestCourseList.length);
  };

  const handlePrevCourse = () => {
    setCurrentCourseIndex((prevIndex) =>
      prevIndex === 0 ? bestCourseList.length - 1 : prevIndex - 1
    );
  };

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={{ uri: courseData.backgroundImg }}
        style={styles.background}
        blurRadius={3}
      >
        <BackSearchHeader onPressSearch={() => { navigation.navigate('course-feed/search') }} />

        <View style={styles.courseContainer}>
          <TouchableOpacity onPress={handlePrevCourse}>
            <LeftArrowIcon width={getSize(32)} height={getSize(32)} />
          </TouchableOpacity>
          <MainCourseDetailBox
            title={courseData.title}
            time={courseData.time}
            distance={courseData.distance}
            routeImg={'img'}
            location={courseData.location}
            description={courseData.description}
            name={courseData.author}
            onPressRun={() => { handleRunButton(courseData.id) }}
            onPressPlus={() => { handlePlusButton(courseData.id) }}
          />
          <TouchableOpacity onPress={handleNextCourse}>
            <RightArrowIcon width={getSize(32)} height={getSize(32)} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getSize(Sizes.formMargin),
    marginTop: getSize(60),
    alignItems: 'center',
    width: width,
  },
});

export default CourseFEedDetailScreen;