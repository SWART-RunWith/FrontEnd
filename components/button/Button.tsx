import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

interface DefaultButtonProps {
  onPress: () => void;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  style?: object;
  width?: number;
  height?: number;
  radius?: number;
  gap?: number;
  isGary?: boolean;
  disabled?: boolean;
}

const DefaultButton = ({
  onPress,
  text = '',
  fontSize = Sizes.boxText,
  fontFamily = 'Pretendard-SemiBold',
  style = {},
  width = 179,
  height = 40,
  radius = 10,
  isGary = false,
  disabled = false,
}: DefaultButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: getSize(width),
        height: getSize(height),
        borderRadius: radius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isGary ? Colors.grayBox : Colors.main,
        ...style,
      }}
    >
      <Text style={{
        fontSize: getSize(fontSize),
        fontFamily,
        color: isGary ? 'white' : 'black',
        textAlign: 'center',
      }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const LoginButton = ({
  text = '로그인',
  ...props
}: DefaultButtonProps) => {
  return <DefaultButton {...props} text={text} />;
};

const SignUpButton = ({
  text = '회원가입',
  ...props
}: DefaultButtonProps) => {
  return <DefaultButton {...props} text={text} />;
};

const ProfileUpdateButton = ({
  text = '프로필 수정',
  ...props
}: DefaultButtonProps) => {
  return <DefaultButton {...props} text={text} />
}

const ProfileSaveButton = ({
  text = '프로필 저장',
  ...props
}: DefaultButtonProps) => {
  return <DefaultButton {...props} text={text} />
}

export {
  DefaultButton,
  LoginButton,
  SignUpButton,
  ProfileUpdateButton,
  ProfileSaveButton,
};