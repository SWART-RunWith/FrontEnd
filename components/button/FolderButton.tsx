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
  isSelected?: boolean;
  showNum?: boolean;
  count: number;
  onPress: () => void;
}

export const FolderButton: React.FC<FolderProps> = ({
  name = '',
  isSelected = false,
  showNum = false,
  count = 0,
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
      {showNum && <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>}
    </TouchableOpacity>
  );
};

export const CourseSaveFolderButton: React.FC<FolderProps> = ({
  name = '',
  isSelected = false,
  count = 0,
  onPress,
}) => {
  return (
    <FolderButton
      name={name}
      isSelected={isSelected}
      showNum={isSelected}
      count={count}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayBox,
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(56),
    paddingHorizontal: getSize(10),
    borderRadius: 10,
  },
  selectedShadow: {
    shadowColor: Colors.main,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: getSize(4),
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
    position: 'absolute',
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize(28),
    height: getSize(28),
    borderRadius: 100,
    right: getSize(12),
  },
  count: {
    color: 'black',
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
  },
})