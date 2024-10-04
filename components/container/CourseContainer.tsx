import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { FolderButton } from "@/components/button/FolderButton";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import { useNavigation } from "@react-navigation/native";
import { CourseFeedMineScreenNavigationProp } from "@/scripts/navigation";
import { CourseBox } from "../box/CourseFeed";
import { formatDistance, formatTime } from "@/scripts/format";

const { width } = Dimensions.get('window');

interface CourseContainerProp {
  Course: {
    id: number;
    title: string;
    time: number;
    distance: number;
  }[];
  selectedCourses?: number[];
  onFolderPress: (courseId: number) => void;
}

export const CourseContainer: React.FC<CourseContainerProp> = ({
  Course,
  selectedCourses = [],
  onFolderPress,
}) => {
  const navigation = useNavigation<CourseFeedMineScreenNavigationProp>();

  return (
    <View style={styles.courseContainer}>
      <View style={styles.courseList}>
        {Course.map((course) => (
          <View key={course.id} style={styles.courseWrapper}>
            <CourseBox
              title={course.title}
              time={formatTime(course.time)}
              distance={formatDistance(course.distance) + 'KM'}
              backgroundImg={""}
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