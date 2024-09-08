import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import { Path, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');

// 아이콘 객체의 타입 정의
interface IconObject {
  svg?: React.ReactNode;
  onPress: () => void;
}

// DefaultHeader: 아이콘을 렌더링 가능하게 수정
interface DefaultHeaderProps {
  onPress?: () => void;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  leftSvg?: React.ReactNode;
  rightSvg?: React.ReactNode;
  rightSvg2?: React.ReactNode;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  text = 'RUNWITH',
  fontSize = 20,
  fontFamily = 'Hanson',
  fontColor = Colors.main,
  leftSvg,
  rightSvg,
  rightSvg2,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* 왼쪽 SVG 아이콘 */}
      <View style={styles.leftIcons}>
        {leftSvg && (
          <TouchableOpacity style={styles.iconButton}>
            {leftSvg}
          </TouchableOpacity>
        )}
      </View>

      {/* 중앙 텍스트 */}
      <View style={styles.centerText}>
        <Text style={{
          fontSize: getSize(fontSize),
          fontFamily,
          color: fontColor,
        }}>
          {text}
        </Text>
      </View>

      {/* 오른쪽 SVG 아이콘 1 */}
      <View style={styles.rightIcons}>
        {rightSvg && (
          <TouchableOpacity style={styles.iconButton}>
            {rightSvg}
          </TouchableOpacity>
        )}
      </View>

      {/* 오른쪽 SVG 아이콘 2 */}
      <View style={styles.rightIcons}>
        {rightSvg2 && (
          <TouchableOpacity style={styles.iconButton}>
            {rightSvg2}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// BackHeader: DefaultHeader를 확장하여 기본적으로 뒤로가기 아이콘 추가
interface BackHeaderProps extends DefaultHeaderProps {
  leftIcons?: IconObject[];
}

const BackHeader: React.FC<BackHeaderProps> = ({
  text = '',
  fontSize = 20,
  fontFamily = 'Hanson',
  fontColor = Colors.main,
  onPress,
  containerStyle = {},
  leftSvg = (
    <Svg width={getSize(14)} height={getSize(24)} viewBox="0 0 14 24" fill="none">
      <Path
        d="M13.3708 0.470024C12.7392 -0.156675 11.7208 -0.156675 11.0892 0.470024L0.377051 11.0983C-0.125684 11.5971 -0.125684 12.4029 0.377051 12.9017L11.0892 23.53C11.7208 24.1567 12.7392 24.1567 13.3708 23.53C14.0024 22.9033 14.0024 21.8929 13.3708 21.2662L4.03799 11.9936L13.3837 2.72102C14.0024 2.10711 14.0024 1.08393 13.3708 0.470024Z"
        fill="white"
      />
    </Svg>
  ),
}) => {
  const navigation = useNavigation();

  return (
    <DefaultHeader
      text={text}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontColor={fontColor}
      leftSvg={(
        <TouchableOpacity
          onPress={onPress}
          style={styles.iconButton}
        >
          {leftSvg}
        </TouchableOpacity>
      )}
      containerStyle={containerStyle}
    />
  );
};

// LoginHeader와 SignUpHeader는 BackHeader를 사용
const LoginHeader: React.FC<BackHeaderProps> = ({
  text = '로그인',
  fontFamily = 'Pretendard-SemiBold',
  fontSize = Sizes.pageTitle,
  ...props
}) => {
  return <BackHeader {...props} text={text} fontFamily={fontFamily} fontSize={getSize(fontSize)} />;
};

const SignUpHeader: React.FC<BackHeaderProps> = ({
  text = '회원가입',
  fontFamily = 'Pretendard-SemiBold',
  fontSize = Sizes.pageTitle,
  ...props
}) => {
  return <BackHeader {...props} text={text} fontFamily={fontFamily} fontSize={getSize(fontSize)} />;
};

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
  },
});

export {
  DefaultHeader,
  BackHeader,
  LoginHeader,
  SignUpHeader,
};
