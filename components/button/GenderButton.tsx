import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const { width } = Dimensions.get('window');

interface GenderButtonProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

const GenderButton: React.FC<GenderButtonProps> = ({
  text,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.genderButton,
        isSelected ? styles.activeButton : styles.inactiveButton
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isSelected ? styles.activeText : styles.inactiveText
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genderButton: {
    width: (width - getSize(Sizes.formMargin)) / 2 - (getSize(8) * 2),
    height: getSize(56),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: Colors.main,
  },
  inactiveButton: {
    backgroundColor: Colors.grayBox,
  },
  text: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-SemiBold',
  },
  activeText: {
    color: 'black',
  },
  inactiveText: {
    color: 'rgba(255, 255, 255, 0.22)',
  },
});

export default GenderButton;
