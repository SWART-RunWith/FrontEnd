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

interface SearchIconProps {
  onPressSearch: () => void;
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

export const CourseSaveHeader: React.FC<
  BackIconProps & SearchIconProps
> = ({
  onPressBack,
  onPressSearch,
}) => {
    return (
      <CombinedHeader
        isLeftSearch={false}
        hasSearchModal={true}
        query='folder search uri'
        backProps={{ onPress: onPressBack }}
        textProps={{ text: '' }}
        searchProps={{ onPress: onPressSearch }}
      />
    );
  };

const MyFolderHeader: React.FC<
  BackIconProps & SearchIconProps
> = ({
  onPressBack,
  onPressSearch,
}) => {
    return (
      <CombinedHeader
        isLeftSearch={false}
        backProps={{ onPress: onPressBack }}
        textProps={{
          text: '내 폴더',
          fontColor: 'white',
        }}
        searchProps={{ onPress: onPressSearch }}
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

export const CourseMyHomeHeader: React.FC<CombinedHeaderProps> = ({
  backProps,
  optionProps,
}) => {
  return (
    <CombinedHeader
      isBlack={true}
      backProps={{}}
      optionProps={{}}
      textProps={{ text: '' }}
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
