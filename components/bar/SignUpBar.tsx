import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { BarProps, DefaultBar } from '@/components/bar/Bar';

// 회원가입 Bar 컴포넌트
const SignUpBar = ({
  isRequired = true,
  ...props
}: BarProps) => {
  return <DefaultBar
    isRequired={isRequired}
    {...props} />;
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
  keyboardType = 'email-address',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
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
  keyboardType = 'phone-pad',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
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

const validateHeight = (height: string) => {
  const heightValue = parseFloat(height)

  if (heightValue > 250) {
    Alert.alert("키 입력 오류", "키가 너무 큽니다. 250 이하의 값을 입력해 주세요.");
    return false;
  }

  return true;
}

const SignUpHeightBar = ({
  label = "키",
  placeholder = "키를 입력해주세요",
  keyboardType = 'decimal-pad',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onBlur={() => validateHeight(props.value ?? '160')}
      {...props}
    />
  );
};

const validateWeight = (weight: string) => {
  const weightValue = parseFloat(weight)

  if (weightValue > 250) {
    Alert.alert("체중 입력 오류", "체중이 너무 큽니다. 250 이하의 값을 입력해 주세요.");
    return false;
  }

  return true;
}


const SignUpWeightBar = ({
  label = "체중",
  placeholder = "체중을 입력해주세요",
  keyboardType = 'decimal-pad',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onBlur={() => validateWeight(props.value ?? '70')}
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