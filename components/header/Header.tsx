import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextInput,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import BackSvgIcon from '@/assets/icons/back.svg';
import EditSvgIcon from '@/assets/icons/edit.svg';
import SettingSvgIcon from '@/assets/icons/setting.svg';
import OptionSvgIcon from '@/assets/icons/option.svg';
import SearchSvgIcon from '@/assets/icons/search.svg';
import BacKBlackSvgIcon from '@/assets/icons/backBlack.svg';
import OptionBlackSvgIcon from '@/assets/icons/optionBlack.svg';
import SearchBlackSvgIcon from '@/assets/icons/searchBlack.svg';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';

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

export const BackIcon: React.FC<IconProps> = ({ onPress }) => {
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

export const BackBlackIcon: React.FC<IconProps> = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress || (() => navigation.goBack())}
      style={styles.iconButton}
    >
      <BacKBlackSvgIcon width={getSize(14)} height={getSize(24)} />
    </TouchableOpacity>
  );
};

export const EditIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.iconButton}
  >
    <EditSvgIcon width={getSize(24)} height={getSize(24)} />
  </TouchableOpacity>
);

export const SettingIcon: React.FC<IconProps> = ({ onPress }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('user/setting')}
      style={styles.iconButton}
    >
      <SettingSvgIcon width={getSize(24)} height={getSize(23)} />
    </TouchableOpacity>
  );
};

export const OptionIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.iconButton]}
  >
    <View style={{ paddingLeft: getSize(24 - 5.33) }}>
      <OptionSvgIcon width={getSize(5.33)} height={getSize(24)} />
    </View>
  </TouchableOpacity >
);

export const OptionBlackIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.iconButton}
  >
    <OptionBlackSvgIcon width={getSize(5.33)} height={getSize(24)} />
  </TouchableOpacity>
);

export const SearchIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconButton}>
    <SearchSvgIcon width={getSize(24)} height={getSize(24)} />
  </TouchableOpacity>
);

export const SearchBlackIcon: React.FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconButton}>
    <SearchBlackSvgIcon width={getSize(24)} height={getSize(24)} />
  </TouchableOpacity>
);

export const SearchTextIcon: React.FC<{
  query?: string;
}> = ({
  query,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const inputWidthAnim = useRef(new Animated.Value(0)).current;

    const toggleSearchBar = () => {
      if (isVisible) {
        Animated.timing(inputWidthAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start(() => setIsVisible(false));
      } else {
        setIsVisible(true);
        Animated.timing(inputWidthAnim, {
          toValue: width - getSize(Sizes.formMargin),
          duration: 300,
          useNativeDriver: false,
        }).start();
        setSearchText('');
      }
    };

    const handleSearchSubmit = () => {
      // to do : api 연동
      console.log('uri : ' + query + '?' + searchText);
      toggleSearchBar();
    };

    return (
      <View style={styles.searchContainer}>
        {/* text input */}
        {isVisible && (
          <Animated.View
            style={[
              styles.animatedInputContainer,
              { width: inputWidthAnim, right: -getSize(Sizes.formMargin / 2) }, // Opens to the left of the icon
            ]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="폴더, 코스 검색"
              placeholderTextColor={Colors.placeholder}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              autoFocus={true}
            />
          </Animated.View>
        )}

        {/* Search Icon */}
        <TouchableOpacity
          onPress={isVisible ? handleSearchSubmit : toggleSearchBar}
          style={styles.iconButton}
        >
          <SearchSvgIcon width={getSize(24)} height={getSize(24)} />
        </TouchableOpacity>
      </View>
    );
  };

// TextProps 정의
interface TextProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
}

const HeaderText: React.FC<TextProps> = ({
  text = '',
  fontSize = Sizes.pageTitle,
  fontFamily = 'Pretendard-SemiBold',
  fontColor = Colors.main,
}) => (
  <Text
    style={{
      fontSize: getSize(fontSize),
      fontFamily,
      color: fontColor,
    }}
  >
    {text}
  </Text>
);

interface CombinedHeaderProps {
  showBackIcon?: boolean;
  isLeftSearch?: boolean;
  hasSearchModal?: boolean;
  query?: string;
  isBlack?: boolean;
  backProps?: IconProps;
  editProps?: IconProps;
  settingProps?: IconProps;
  optionProps?: IconProps;
  searchProps?: IconProps;
  textProps?: TextProps;
  containerStyle?: ViewStyle;
}

const CombinedHeader: React.FC<CombinedHeaderProps> = ({
  showBackIcon = true,
  isLeftSearch = false,
  hasSearchModal = true,
  query = '',
  isBlack = false,
  backProps,
  editProps,
  settingProps,
  optionProps,
  searchProps,
  textProps,
  containerStyle = {},
}) => {
  const adjustedTextProps = {
    ...textProps,
    fontColor: isBlack ? 'black' : textProps?.fontColor || 'white',
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftIconContainer}>
        {/* Back Icon */}
        {showBackIcon && backProps && (
          <View style={styles.leftIcons}>
            {isBlack
              ? <BackBlackIcon {...backProps} />
              : <BackIcon {...backProps} />
            }
          </View>
        )}
      </View>

      {/* Search Icon */}
      {isLeftSearch && searchProps && (
        <View style={styles.leftIcons}>
          {hasSearchModal ? (
            <SearchTextIcon query={query} />
          ) : (
            <SearchIcon {...searchProps} />
          )}
        </View>
      )}

      {/* Text */}
      <View style={styles.centerText}>
        <HeaderText {...adjustedTextProps} />
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

        {/* Search Icon */}
        {!isLeftSearch && searchProps && (
          <View style={styles.rightIcons}>
            {hasSearchModal ? (
              <SearchTextIcon query={query} />
            ) : (
              isBlack
                ? <SearchBlackIcon {...searchProps} />
                : <SearchIcon {...searchProps} />
            )}
          </View>
        )}

        {/* Option Icon */}
        {optionProps && (
          <View style={styles.rightIcons}>
            {isBlack
              ? <OptionBlackIcon {...optionProps} />
              : <OptionIcon {...optionProps} />
            }
          </View>
        )}
      </View>
    </View>
  );
};

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
  leftIcons: {},
  rightIconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: getSize(24),
    right: getSize(Sizes.formMargin),
  },
  rightIcons: {},
  iconButton: {
    width: getSize(24),
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedInputContainer: {
    backgroundColor: Colors.grayBox,
    height: getSize(50),
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
  searchInput: {
    color: 'white',
    paddingHorizontal: getSize(Sizes.formMargin),
    fontSize: getSize(18),
  },
});

export { TextProps, HeaderText, CombinedHeader, CombinedHeaderProps };
