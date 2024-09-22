import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import LocationIcon from '@/assets/icons/location.svg';
import BottomArrowIcon from '@/assets/icons/bottomArrow.svg';
import {
  CombinedHeader,
  CombinedHeaderProps,
  SearchIcon,
} from '@/components/header/Header';
import getSize from '@/scripts/getSize';
import { TouchableOpacity } from 'react-native';
import Fonts from '@/constants/Fonts';

const { width } = Dimensions.get('window');

interface BackIconProps {
  onPressBack: () => void;
}

interface SearchIconProps {
  onPressSearch: () => void;
}

interface OptionIconProps {
  onPressOption: () => void;
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

export const BackOptionHeader: React.FC<
  BackIconProps & OptionIconProps
> = ({
  onPressBack,
  onPressOption,
}
) => {
    return (
      <CombinedHeader
        backProps={{ onPress: onPressBack }}
        optionProps={{ onPress: onPressOption }}
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
        isBlack={true}
        backProps={{ onPress: onPressBack }}
        textProps={{
          text: '내 폴더',
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

type SearchStackList = {
  "course-feed/search": undefined;
  "course-feed/home": undefined;
};

type SearchNavigationProps = StackNavigationProp<
  SearchStackList,
  "course-feed/home"
>;

const SearchNavIcon = () => {
  const navigation = useNavigation<SearchNavigationProps>();

  return (
    <SearchIcon onPress={() => { navigation.navigate('course-feed/search') }} />
  );
};

export const CourseFeedMainHeader: React.FC = ({ }) => {
  const pressArrowIcon = () => {
    // to do : 위치 모달창 열기
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <LocationIcon width={getSize(16.36)} height={getSize(24)} />
        <Text style={styles.leftText}>전체</Text>
        <TouchableOpacity
          style={styles.arrowIconContainer}
          onPress={pressArrowIcon}
        >
          <BottomArrowIcon width={getSize(24)} height={getSize(13.85)} />
        </TouchableOpacity>
      </View>
      <SearchNavIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: getSize(29),
    marginTop: getSize(58),
    paddingHorizontal: getSize(16),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(29),
  },
  leftText: {
    color: 'white',
    fontSize: getSize(24),
    fontFamily: Fonts.regular,
    marginLeft: getSize(8),
  },
  arrowIconContainer: {
    justifyContent: 'center',
    height: getSize(29),
    width: getSize(24),
    marginLeft: getSize(12),
  }
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
