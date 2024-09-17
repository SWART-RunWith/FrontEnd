import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { CourseMyHomeHeader } from "@/components/header/IconHeader";
import Fonts from "@/constants/Fonts";
import Styles from "@/constants/Styles";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";

const { width } = Dimensions.get('window');

const CourseMyHomeScreen = () => {
  return (
    <View style={Styles.container}>
      <LinearGradient
        colors={['rgba(176, 255, 76, 0.9)', 'transparent']}
        style={styles.gradientOverlay}
      >
        <CourseMyHomeHeader />

        <View style={styles.textContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>나의 러닝 코스</Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>내가 그린 나의 코스를 공유하고 뛰어보세요.</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: getSize(495),
  },
  textContainer: {
    marginTop: getSize(31),
    width: width,
    paddingHorizontal: getSize(Sizes.formMargin)
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
  }
})
export default CourseMyHomeScreen;