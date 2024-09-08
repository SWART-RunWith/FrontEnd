import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const { width } = Dimensions.get('window');

// 기본 Bar 컴포넌트
interface BarProps {
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isSecure?: boolean;
  isRequired?: boolean;
  buttonText?: string;
  onButtonPressIn?: () => void;
  onButtonPressOut?: () => void;
  errorText?: string;
  unit?: string;
  svgIcon?: React.ReactNode;
}

// 기본 Bar 컴포넌트
const DefaultBar = ({
  label = '',
  placeholder = '',
  placeholderTextColor = "rgba(255, 255, 255, 0.22)",
  value = '',
  onChangeText,
  isSecure = false,
  isRequired = false,
  buttonText = '',
  onButtonPressIn,
  onButtonPressOut,
  errorText = '',
  unit = '',
  svgIcon = null,
}: BarProps) => {
  return (
    <View style={styles.container}>
      {/* 라벨 */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && (
          <Ionicons
            name="checkmark-circle"
            size={getSize(14)}
            color={Colors.main}
          />
        )}
      </View>

      {/* 입력 창 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />

        {buttonText ? (
          <TouchableOpacity style={styles.button} onPress={onButtonPressIn}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : unit ? (
          <Text style={styles.unitText}>{unit}</Text>
        ) : svgIcon ? (
          <TouchableOpacity
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
          >
            <View style={styles.svgIconContainer}>
              {svgIcon}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

// 회원가입 Bar 컴포넌트
const SignUpBar = ({
  isRequired = true,
  ...props
}: BarProps) => {
  return <DefaultBar isRequired={isRequired} {...props} />;
};

const SignUpNameBar = ({
  label = "이름",
  placeholder = "이름을 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const SignUpEmailBar = ({
  label = "이메일",
  placeholder = "이메일을 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const SignUpPasswordBar = ({
  label = "비밀번호",
  placeholder = "비밀번호를 입력해주세요",
  ...props
}: BarProps) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      isSecure={secureText}
      svgIcon={<Ionicons
        name={secureText ? 'eye-off' : 'eye'}
        size={20}
        color="rgba(255, 255, 255, 0.6)"
      />}
      onButtonPressIn={() => setSecureText(false)}
      onButtonPressOut={() => setSecureText(true)}
      {...props}
    />
  );
};

const SignUpPhoneBar = ({
  label = "전화번호",
  placeholder = "전화번호를 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const SignUpBirthBar = ({
  label = "생년월일",
  placeholder = "생년월일을 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const SignUpHeightBar = ({
  label = "키",
  placeholder = "키를 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const SignUpWeightBar = ({
  label = "체중",
  placeholder = "체중을 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

export {
  SignUpBar,
  SignUpNameBar,
  SignUpEmailBar,
  SignUpPasswordBar,
  SignUpPhoneBar,
  SignUpBirthBar,
  SignUpHeightBar,
  SignUpWeightBar,
}

// 로그인 Bar 컴포넌트
const LoginBar = ({
  isRequired = false,
  ...props
}: BarProps) => {
  return <DefaultBar isRequired={isRequired} {...props} />;
};

const LoginEmailBar = ({
  label = "이메일",
  placeholder = "이메일을 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <LoginBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const LoginPasswordBar = ({
  label = "비밀번호",
  placeholder = "비밀번호를 입력해주세요",
  ...props
}: BarProps) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <LoginBar
      label={label}
      placeholder={placeholder}
      isSecure={secureText}
      svgIcon={<Ionicons
        name={secureText ? 'eye-off' : 'eye'}
        size={20}
        color="rgba(255, 255, 255, 0.6)"
      />}
      onButtonPressIn={() => setSecureText(false)}
      onButtonPressOut={() => setSecureText(true)}
      {...props}
    />
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    marginHorizontal: getSize(Sizes.formMargin),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize(8),
  },
  label: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    color: 'white',
    marginRight: getSize(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
    height: getSize(56),
    width: width - 32,
    borderRadius: 10,
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  textInput: {
    flex: 1,
    paddingVertical: getSize(10),
    fontSize: getSize(Sizes.boxText),
    color: 'white',
    fontFamily: 'Pretendard-Regular',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: getSize(15),
    paddingVertical: getSize(10),
    borderRadius: 5,
  },
  buttonText: {
    fontSize: getSize(14),
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },
  unitText: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Regular',
    marginLeft: getSize(10),
  },
  svgIconContainer: {
    marginLeft: getSize(10),
  },
  errorText: {
    fontSize: getSize(12),
    color: 'red',
    marginTop: getSize(5),
    fontFamily: 'Pretendard-Regular',
  },
});

export {
  DefaultBar,
  LoginBar,
  LoginEmailBar,
  LoginPasswordBar,
};
