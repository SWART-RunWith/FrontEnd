import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView
} from "react-native";
import { useRoute } from "@react-navigation/native";

import LocationIcon from '@/assets/icons/location.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { BackOptionHeader } from "@/components/header/IconHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import Styles from "@/constants/Styles";
import getSize from "@/scripts/getSize";
import { CourseSaveScreenRouteProp } from "@/scripts/navigation";
import { CourseBox } from "@/components/box/CourseFeed";

const { width } = Dimensions.get('window');

const MyCourseScreen = () => {
  const route = useRoute<CourseSaveScreenRouteProp>();
  const { folderId } = route.params;
  const [courseName, setCourseName] = useState('');

  const folderName = '서천동';
  const courseList = [
    { title: '경희대 - 서천 최애 달립니다 야호', time: '00:40:28', distance: '03.66KM' },
    { title: '업힐 훈련', time: '01:20:14', distance: '04.30KM' },
    { title: '반달런', time: '00:31:25', distance: '02.58KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
  ];

  return (
    <View style={Styles.container} >
      <BackOptionHeader
        onPressBack={() => { }}
        onPressOption={() => { }}
      />

      <View style={styles.topContainer}>
        <View style={styles.folderNameContainer}>
          <LocationIcon width={getSize(17)} height={getSize(24)} />
          <View style={styles.folderNameWrapper}>
            <Text style={styles.folderNameText}>{folderName}</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <SearchIcon width={getSize(24)} height={getSize(24)} />
          <TextInput
            style={styles.searchInput}
            placeholder="코스를 입력해주세요"
            placeholderTextColor={Colors.placeholder}
            value={courseName}
            onChangeText={setCourseName}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.courseListContainer}>
        {courseList.map((course, index) => (
          <CourseBox
            key={index}
            title={course.title}
            time={course.time}
            distance={course.distance}
            img={""}
            onPressSave={() => console.log("Save course:", course.title)}
            onPressButton={() => console.log("Start course:", course.title)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: getSize(105),
    marginTop: getSize(27),
    paddingHorizontal: getSize(Sizes.formMargin),
    marginBottom: getSize(20),
  },
  folderNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(10),
    gap: getSize(7),
  },
  folderNameWrapper: {
    height: getSize(29),
  },
  folderNameText: {
    color: 'white',
    fontSize: getSize(24),
    fontFamily: Fonts.bold,
  },
  searchBar: {
    backgroundColor: Colors.grayBox,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: getSize(56),
    paddingHorizontal: getSize(10),
    marginTop: getSize(20),
    borderRadius: 10,
    gap: getSize(10),
  },
  searchInput: {
    color: 'white',
    fontSize: getSize(18),
  },
  courseListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width,
    gap: getSize(20),
    paddingBottom: getSize(20),
    paddingHorizontal: getSize(Sizes.formMargin),
  },
})

export default MyCourseScreen;