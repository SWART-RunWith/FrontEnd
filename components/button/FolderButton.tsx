import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "@/constants/Colors";
import getSize from "@/scripts/getSize";

import LocationIcon from '@/assets/icons/location.svg';

interface FolderProps {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export const FolderButton: React.FC<FolderProps> = ({
  name = '',
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.container,
      isSelected && styles.selectedShadow,
    ]}>
      <LocationIcon width={getSize(17)} height={getSize(24)} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.countContainer}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayBox,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: getSize(171),
    height: getSize(56),
    paddingHorizontal: getSize(10),
    borderRadius: 10,
  },
  selectedShadow: {
    shadowColor: Colors.main,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 10,
  },
  nameContainer: {
    height: getSize(19),
    marginHorizontal: getSize(8),
  },
  name: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Medium',
  },
  countContainer: {
    width: getSize(28),
    height: getSize(28),
    backgroundColor: Colors.main,
    borderRadius: 100,
    right: getSize(2),
  },
})