import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View

} from "react-native";

import UploadIcon from '@/assets/icons/upload.svg';
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
        <View style={{ height: getSize(14) }}>
          <Text
            style={styles.titleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{title}</Text>
        </View>
        <View style={{
          marginTop: getSize(10),
          height: getSize(12),
        }}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={{
          marginTop: getSize(6),
          height: getSize(14),
        }}>
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
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
          text="코스 뛰기" />
      </View>
    </View>
  );
};

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
})