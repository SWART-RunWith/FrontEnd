import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View
} from "react-native";
import { BlurView } from 'expo-blur';

import Styles from '@/constants/Styles';
import getSize from "@/scripts/getSize";

const { width, height } = Dimensions.get('window');

const CourseFeedHomeScreen = () => {
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('@/assets/images/course-main.png')}
        style={styles.backImg}
        blurRadius={5}
      />


    </View>
  );
};
const styles = StyleSheet.create({
  backImg: {
    flex: 1,
    resizeMode: 'cover',
    height: getSize(1156),
    width: '100%',
  },
});

export default CourseFeedHomeScreen;