import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { FolderButton } from "@/components/button/FolderButton";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import { useNavigation } from "@react-navigation/native";
import { CourseFeedScreenNavigationProp } from "@/scripts/navigation";
import { CourseBox } from "../box/CourseFeed";

const { width } = Dimensions.get('window');

interface CourseContainerProp {
  courseList: {
    id: number,
    title: string,
    time: string,
    distance: string,
  }[];
  selectedCourses?: number[];
  onFolderPress: (courseId: number) => void;
}

export const CourseContainer: React.FC<CourseContainerProp> = ({
  courseList,
  selectedCourses = [],
  onFolderPress,
}) => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  return (
    <View style={styles.courseContainer}>
      <View style={styles.courseList}>
        {courseList.map((course) => (
          <View key={course.id} style={styles.courseWrapper}>
            <CourseBox
              title={course.title}
              time={course.time}
              distance={course.distance}
              img={""}
              isSelected={selectedCourses.includes(course.id)}
              onPress={() => onFolderPress(course.id)}
              onPressSave={() => console.log("Save course:", course.title)}
              onPressButton={() => console.log("Start course:", course.title)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    paddingHorizontal: getSize(16),
  },
  courseList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  courseWrapper: {
    width: getSize(172),
    marginBottom: getSize(20),
  },
})