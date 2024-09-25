import { Dimensions, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import getSize from "@/scripts/getSize"

const { width } = Dimensions.get('window');

export const MainGradient = () => {
  return (
    <LinearGradient
      colors={['rgba(176, 255, 76, 0.9)', 'transparent']}
      style={styles.gradientOverlay}
    />
  )
}

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: getSize(495),
  },
})