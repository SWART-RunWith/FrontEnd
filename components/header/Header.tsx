import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import BackSvgIcon from '@/assets/icons/back.svg';
import EditSvgIcon from '@/assets/icons/edit.svg';
import SettingSvgIcon from '@/assets/icons/setting.svg';

const { width } = Dimensions.get('window');

// 공통 타입 정의
interface IconProps {
  onPress?: () => void;
}

// BackProps 정의
const BackIcon: React.FC<IconProps> = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress || (() => navigation.goBack())}
      style={styles.iconButton}
    >
      <BackSvgIcon width={getSize(14)} height={getSize(24)} />
    </TouchableOpacity>
  );
};

// EditProps 정의
const EditIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.iconButton}
  >
    <EditSvgIcon width={getSize(24)} height={getSize(24)} />
  </TouchableOpacity>
);

// SettingProps 정의
const SettingIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.iconButton}
  >
    <SettingSvgIcon width={getSize(24)} height={getSize(23)} />
  </TouchableOpacity>
);

// TextProps 정의
interface TextProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
}

const HeaderText: React.FC<TextProps> = ({
  text = 'RUNWITH',
  fontSize = 20,
  fontFamily = 'Hanson',
  fontColor = Colors.main,
}) => (
  <Text style={{
    fontSize: getSize(fontSize),
    fontFamily,
    color: fontColor
  }}>
    {text}
  </Text>
);

interface CombinedHeaderProps {
  backProps?: IconProps;
  editProps?: IconProps;
  settingProps?: IconProps;
  textProps?: TextProps;
  containerStyle?: ViewStyle;
}

const CombinedHeader: React.FC<CombinedHeaderProps> = ({
  backProps,
  editProps,
  settingProps,
  textProps,
  containerStyle = {},
}) => (
  <View style={[styles.container, containerStyle]}>
    {/* Back Icon */}
    {backProps && (
      <View style={styles.leftIcons}>
        <BackIcon {...backProps} />
      </View>
    )}

    {/* Text */}
    <View style={styles.centerText}>
      <HeaderText {...textProps} />
    </View>

    {/* Edit Icon */}
    {editProps && (
      <View style={styles.rightIcons}>
        <EditIcon {...editProps} />
      </View>
    )}

    {/* Settings Icon */}
    {settingProps && (
      <View style={styles.rightIcons}>
        <SettingIcon {...settingProps} />
      </View>
    )}
  </View>
);

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    marginTop: getSize(57),
    marginHorizontal: getSize(Sizes.formMargin),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: getSize(29),
    zIndex: 10,
  },
  leftIcons: {
    position: 'absolute',
    left: 0,
  },
  rightIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: getSize(15),
  },
  iconButton: {
    marginHorizontal: getSize(10),
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {
  CombinedHeader,
  BackIcon,
  EditIcon,
  SettingIcon,
  HeaderText
};
