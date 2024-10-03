import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import LocationIcon from '@/assets/icons/location.svg';
import OptionIcon from '@/assets/icons/option.svg';
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";

const { width } = Dimensions.get('window');

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
      <View style={styles.locationContainer}>
        <LocationIcon width={getSize(17)} height={getSize(24)} />
        <Text style={styles.location}>{location}</Text>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.content}>{content}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressButton}>
        <Text style={styles.buttonText}>크루 보기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionIcon} onPress={onPressOption}>
        <OptionIcon height={getSize(22)} width={getSize(8)} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrayBox,
    borderRadius: 20,
    width: width - getSize(Sizes.formMargin * 2),
    height: getSize(187),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: getSize(20),
    marginTop: getSize(17),
    gap: getSize(6),
  },
  location: {
    color: 'white',
    fontSize: getSize(12),
    fontFamily: Fonts.semiBold,
    height: getSize(14),
  },
  nameContainer: {
    marginLeft: getSize(20),
  },
  name: {
    color: Colors.main,
    fontSize: getSize(26),
    fontFamily: Fonts.bold,
  },
  contentContainer: {
    marginHorizontal: getSize(21),
    marginTop: getSize(10),
  },
  content: {
    color: 'white',
    fontSize: getSize(12),
    fontFamily: Fonts.light,
  },
  button: {
    position: 'absolute',
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: getSize(121),
    height: getSize(36),
    right: getSize(20),
    bottom: getSize(17),
  },
  buttonText: {
    color: 'black',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    height: getSize(19),
  },
  optionIcon: {
    position: 'absolute',
    right: getSize(28),
    top: getSize(23),
    width: getSize(22),
    height: getSize(22),
    alignItems: 'flex-end',
  },
})