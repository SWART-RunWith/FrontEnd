import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import BackSvgIcon from '@/assets/icons/back.svg';
import EditSvgIcon from '@/assets/icons/edit.svg';
import SettingSvgIcon from '@/assets/icons/setting.svg';
import OptionSvgIcon from '@/assets/icons/option.svg';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  "user/profile": undefined;
  "user/setting": undefined;
};

type NavigationProp =
  StackNavigationProp<RootStackParamList, 'user/setting'>;

interface IconProps {
  onPress?: () => void;
}

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

const EditIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.iconButton}
  >
    <EditSvgIcon width={getSize(24)} height={getSize(24)} />
  </TouchableOpacity>
);

const SettingIcon: React.FC<IconProps> = ({ onPress }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      // to do : setting 화면으로 넘어가기
      onPress={() => navigation.navigate('user/setting')}
      style={styles.iconButton}
    >
      <SettingSvgIcon width={getSize(24)} height={getSize(23)} />
    </TouchableOpacity>
  );
};

const OptionIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    // to do : option 모달 띄우기
    onPress={onPress}
    style={styles.iconButton}
  >
    <OptionSvgIcon width={getSize(5.33)} height={getSize(24)} />
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
  fontSize = Sizes.pageTitle,
  fontFamily = 'Pretendard-SemiBold',
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
  showBackIcon?: boolean;
  backProps?: IconProps;
  editProps?: IconProps;
  settingProps?: IconProps;
  optionProps?: IconProps;
  textProps?: TextProps;
  containerStyle?: ViewStyle;
}

const CombinedHeader: React.FC<CombinedHeaderProps> = ({
  showBackIcon = true,
  backProps,
  editProps,
  settingProps,
  optionProps,
  textProps,
  containerStyle = {},
}) => (
  <View style={[styles.container, containerStyle]}>
    <View style={styles.leftIconContainer}>
      {/* Back Icon */}
      {showBackIcon && backProps && (
        <View style={styles.leftIcons}>
          <BackIcon {...backProps} />
        </View>
      )}
    </View>

    {/* Text */}
    <View style={styles.centerText}>
      <HeaderText {...textProps} />
    </View>

    <View style={styles.rightIconContainer}>
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

      {/* Option Icon */}
      {optionProps && (
        <View style={styles.rightIcons}>
          <OptionIcon {...optionProps} />
        </View>
      )}
    </View>
  </View>
);

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    marginTop: getSize(58),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getSize(Sizes.formMargin),
    width: width,
    height: getSize(29),
    zIndex: 10,
  },
  leftIconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: getSize(24),
    left: getSize(Sizes.formMargin),
  },
  leftIcons: {
  },
  rightIconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: getSize(24),
    right: getSize(Sizes.formMargin),
  },
  rightIcons: {
  },
  iconButton: {
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {
  BackIcon,
  EditIcon,
  SettingIcon,
  OptionIcon,
  TextProps,
  HeaderText,
  CombinedHeader,
  CombinedHeaderProps,
};
