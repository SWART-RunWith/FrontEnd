import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  CombinedHeader,
  CombinedHeaderProps,
} from '@/components/header/Header';

const { width } = Dimensions.get('window');

interface BackIconProps {
  onPressBack: () => void;
}

const BackHeader: React.FC<BackIconProps> = ({
  onPressBack
}) => {
  return (
    <CombinedHeader
      backProps={{ onPress: onPressBack }}
      textProps={{ text: '' }}
    />
  )
}

const SignUpHeader: React.FC<BackIconProps> = ({
  onPressBack
}) => {
  return (
    <CombinedHeader
      backProps={{ onPress: onPressBack }}
      textProps={{
        text: '회원가입',
      }}
    />
  );
};

const TermsAgreeHeader: React.FC<BackIconProps> = ({
  onPressBack
}) => {
  return (
    <CombinedHeader
      backProps={{ onPress: onPressBack }}
      textProps={{
        text: '약관 동의',
      }}
    />
  );
};

const MyFolderHeader: React.FC<BackIconProps> = ({
  onPressBack
}) => {
  return (
    <CombinedHeader
      backProps={{ onPress: onPressBack }}
      textProps={{
        text: '내 폴더',
        fontColor: 'white',
      }}
      settingProps={{ onPress: () => console.log('설정 버튼 클릭') }}
    />
  );
};

const ProfileSettingHeader: React.FC<BackIconProps> = ({
  onPressBack
}) => {
  return (
    <CombinedHeader
      backProps={{ onPress: onPressBack }}
      textProps={{
        text: '프로필 설정',
      }}
    />
  );
};

const ProfileHeader: React.FC<CombinedHeaderProps> = ({
  backProps,
  editProps,
  showBackIcon,
}) => {
  return (
    <CombinedHeader
      showBackIcon={showBackIcon}
      backProps={{
        onPress: backProps?.onPress
      }}
      textProps={{
        text: '',
      }}
      editProps={{ onPress: editProps?.onPress }}
      settingProps={{ onPress: () => console.log('설정 버튼 클릭') }}
    />
  );
};

const SettingHeader: React.FC<CombinedHeaderProps> = ({
  backProps,
}) => {
  return (
    <CombinedHeader
      backProps={{}}
      textProps={{
        text: '설정',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
});

export {
  BackHeader,
  SignUpHeader,
  TermsAgreeHeader,
  MyFolderHeader,
  ProfileSettingHeader,
  ProfileHeader,
  SettingHeader,
};
