import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { BarProps, DefaultBar } from '@/components/bar/Bar';

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
      keyboardType='email-address'
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
  const [isSecure, setIsSecure] = useState(false);

  return (
    <LoginBar
      label={label}
      placeholder={placeholder}
      isSecure={secureText}
      eyeIcon={<Ionicons
        name={secureText ? 'eye-off' : 'eye'}
        size={20}
        color="rgba(255, 255, 255, 0.6)"
      />}
      onButtonPress={() => {
        setSecureText(!isSecure);
        setIsSecure(!isSecure);
      }}
      {...props}
    />
  );
};

export {
  LoginBar,
  LoginEmailBar,
  LoginPasswordBar,
};