import React from "react";
import { StyleSheet, View } from "react-native"

interface CrewFeedMapBoxProp {
  crewId: number;
  location: string;
  name: string;
  content: string;
  onPressOption: () => void;
  onPressButton: () => void;
}

export const CrewFeedMapBox: React.FC<CrewFeedMapBoxProp> = ({
  crewId,
  location,
  name,
  content,
  onPressOption,
  onPressButton,
}) => {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
})