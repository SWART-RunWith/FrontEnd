import { StyleSheet, Dimensions } from "react-native";

import Colors from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    width: width,
    height: height,
    alignItems: "center",
  },
});

export default styles;
