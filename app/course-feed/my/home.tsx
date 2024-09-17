import { View } from "react-native";

import { CourseMyHomeHeader } from "@/components/header/IconHeader";
import Styles from "@/constants/Styles";

const CourseMyHomeScreen = () => {
  return (
    <View style={Styles.container}>
      <CourseMyHomeHeader />
    </View>
  )
}

export default CourseMyHomeScreen;