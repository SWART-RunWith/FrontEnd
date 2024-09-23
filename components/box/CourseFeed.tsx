import React, { useEffect, useRef } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";

import UploadIcon from '@/assets/icons/upload.svg';
import LocationIcon from '@/assets/icons/location.svg';
import NextIcon from '@/assets/icons/next.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import CheckIcon from '@/assets/icons/check.svg';
import Colors from "@/constants/Colors";
import getSize from "@/scripts/getSize";
import { CourseButton } from "../button/RunningButton";
import Fonts from "@/constants/Fonts";

interface CourseBoxProps {
  title: string;
  time: string;
  distance: string;
  img: string;
  isSelected: boolean;
  onPress: () => void;
  onPressSave: () => void;
  onPressButton: () => void;
}

export const CourseBox: React.FC<CourseBoxProps> = ({
  title,
  time = "00:00:00",
  distance = "0.0",
  img = "",
  isSelected = false,
  onPress,
  onPressSave,
  onPressButton,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      {isSelected && (
        <View style={styles.checkmarkOverlay}>
          <CheckIcon width={getSize(84)} height={getSize(84)} />
        </View>
      )}
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
          width={100}
          text="코스 뛰기"
        />
      </View>
    </TouchableOpacity>
  );
};

interface CourseProps {
  location: string;
  imgUrl: string;
  onPress: () => void;
}

interface MainCourseProps extends CourseProps {
  onPressButton: () => void;
  onPressPlus: () => void;
}

export const MainCourseBox: React.FC<MainCourseProps> = ({
  location = '장소',
  imgUrl = 'imaUrl',
  onPress,
  onPressButton,
  onPressPlus,
}) => {
  return (
    <View style={MainCourseStyles.cardContainer}>
      <TouchableOpacity
        style={MainCourseStyles.ImageBack}
        onPress={onPress}
      >
        <ImageBackground
          source={{ uri: imgUrl }}
          style={MainCourseStyles.courseImage}
        />

        <View style={MainCourseStyles.locationContainer}>
          <LocationIcon width={getSize(11)} height={getSize(16)} />
          <View style={{ height: getSize(17) }}>
            <Text style={MainCourseStyles.location}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={MainCourseStyles.plusButton} onPress={onPressPlus}>
        <PlusIcon width={getSize(28)} height={getSize(28)} />
      </TouchableOpacity>

      <TouchableOpacity style={MainCourseStyles.nextButton} onPress={onPressButton}>
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
    position: 'relative',
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
  checkmarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 3,
  },
});

const MainCourseStyles = StyleSheet.create({
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
})

interface MyCourseBoxProps {
  location: string;
  imgUrl: string;
  status: number;
  onPress: () => void;
  onPressLeft: () => void;
  onPressRight: () => void;
}

export const MyCourseBox: React.FC<MyCourseBoxProps> = ({
  imgUrl,
  location,
  status,
  onPress,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View style={myCourseStyles.container}>
      <View style={[
        myCourseStyles.barsContainer,
        status !== 2 && { zIndex: 2 }
      ]}>
        <TouchableOpacity
          onPress={onPressLeft}
          style={myCourseStyles.barContainer}
        />
        <TouchableOpacity
          onPress={onPressRight}
          style={myCourseStyles.barContainer}
        />
      </View>

      <View style={myCourseStyles.locationContainer}>
        <LocationIcon width={getSize(17)} height={getSize(24)} />
        <View style={{ height: getSize(17) }}>
          <Text style={myCourseStyles.locationText}>{location}</Text>
        </View>
      </View>

      <View style={myCourseStyles.imageContainer}>
        <ImageBackground
          source={{ uri: imgUrl }}
          style={myCourseStyles.image}
        />
      </View>

      <View style={myCourseStyles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
          <View style={myCourseStyles.runButton}>
            <Text style={myCourseStyles.buttonText}>코스 뛰기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const myCourseStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrayBox,
    height: getSize(310),
    width: getSize(250),
    borderRadius: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(24),
    marginTop: getSize(20),
    gap: getSize(6),
    paddingHorizontal: getSize(26),
  },
  locationText: {
    color: 'white',
    fontSize: getSize(14),
    fontFamily: Fonts.semiBold,
  },
  imageContainer: {
    backgroundColor: 'black',
    marginTop: getSize(20),
    height: getSize(173),
    width: getSize(225),
    overflow: "hidden",
    marginHorizontal: getSize(12.5),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    marginTop: getSize(20),
    marginLeft: getSize(120),
  },
  runButton: {
    backgroundColor: Colors.main,
    height: getSize(40),
    width: getSize(100),
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    color: "black",
  },
  barContainer: {
    width: getSize(100),
    height: getSize(270),
  },
  barsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    top: getSize(20),
    justifyContent: 'space-between',
  },
  one: {
    left: getSize(0),
    right: getSize(0),
    top: getSize(18),
  },
  zero: {
    left: getSize(2),
    right: getSize(2),
    top: getSize(18),
  },
});
