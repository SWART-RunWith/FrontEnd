import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import UploadIcon from '@/assets/icons/upload.svg';
import LocationIcon from '@/assets/icons/location.svg';
import NextIcon from '@/assets/icons/next.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import Colors from "@/constants/Colors";
import getSize from "@/scripts/getSize";
import { CourseButton } from "../button/RunningButton";

interface CourseBoxProps {
  title: string;
  time: string;
  distance: string;
  img: string;
  onPressSave: () => void;
  onPressButton: () => void;
}

export const CourseBox: React.FC<CourseBoxProps> = ({
  title,
  time = "00:00:00",
  distance = "0.0",
  img = "",
  onPressSave,
  onPressButton,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={styles.titleText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.distanceText}>{distance}</Text>
      </View>

      <TouchableOpacity
        style={styles.uploadIcon}
        onPress={onPressSave}
      >
        <UploadIcon width={getSize(28)} height={getSize(28)} />
      </TouchableOpacity>

      <View style={styles.imageContainer} />
      <View style={styles.buttonContainer}>
        <CourseButton
          onPress={onPressButton}
          width={getSize(68)}
          text="코스 뛰기"
        />
      </View>
    </View>
  );
};

interface MainCourseProps {
  location: string;
  imgUrl: string;
  onPress: () => void;
  onPressButton: () => void;
  onPressPlus: () => void;
}

export const MainCourse: React.FC<MainCourseProps> = ({
  location = '장소',
  imgUrl = 'imaUrl',
  onPress,
  onPressButton,
  onPressPlus,
}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.ImageBack} onPress={onPress}>
        <ImageBackground
          source={{ uri: imgUrl }}
          style={styles.courseImage}
        />

        <View style={styles.locationContainer}>
          <LocationIcon width={getSize(11)} height={getSize(16)} />
          <View style={{ height: getSize(17) }}>
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.plusButton} onPress={onPressPlus}>
        <PlusIcon width={getSize(28)} height={getSize(28)} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={onPressButton}>
        <NextIcon width={getSize(44)} height={getSize(44)} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrayBox,
    width: getSize(172),
    height: getSize(240),
    borderRadius: 20,
    alignItems: 'center',
  },
  uploadIcon: {
    position: 'absolute',
    top: getSize(14),
    right: getSize(14),
  },
  textContainer: {
    width: '100%',
    height: getSize(56),
    paddingHorizontal: getSize(14),
    marginTop: getSize(20),
  },
  titleText: {
    width: getSize(99),
    color: 'white',
    fontSize: getSize(12),
  },
  timeText: {
    color: 'white',
    fontSize: getSize(10),
  },
  distanceText: {
    color: Colors.main,
    fontSize: getSize(12),
  },
  imageContainer: {
    backgroundColor: '#d9d9d9',
    width: getSize(143),
    height: getSize(82),
    marginTop: getSize(13),
  },
  buttonContainer: {
    marginTop: getSize(12),
  },
  cardContainer: {
    width: getSize(226),
    height: getSize(309),
    backgroundColor: 'black',
    borderRadius: 20,
    overflow: 'hidden',
  },
  ImageBack: {
    height: '100%',
    width: '100%',
  },
  courseImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  locationContainer: {
    backgroundColor: Colors.darkGrayBox,
    flexDirection: 'row',
    alignItems: 'center',
    width: getSize(144),
    height: getSize(34),
    marginTop: getSize(16),
    marginLeft: getSize(16),
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(8),
    borderRadius: 10,
    gap: getSize(8),
  },
  location: {
    color: 'white',
    fontSize: getSize(14),
    fontWeight: 'bold',
  },
  plusButton: {
    position: 'absolute',
    top: getSize(21),
    right: getSize(14),
  },
  nextButton: {
    position: 'absolute',
    bottom: getSize(16),
    right: getSize(16),
  },
});
