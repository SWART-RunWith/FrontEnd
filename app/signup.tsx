import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { LoginScreenNavigationProp } from '@/scripts/navigation';
import { SignUpBirthBar, SignUpEmailBar, SignUpHeightBar, SignUpNameBar, SignUpPasswordBar, SignUpPhoneBar, SignUpWeightBar } from '@/components/Bar';
import { SignUpHeader } from '@/components/Header';
import { DefaultButton, SignUpButton } from '@/components/Button';
import Colors from '@/constants/Colors';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // 현재 화면의 단계를 관리하는 상태
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이전 화면으로 이동하는 함수
  const prevStep = () => {
    console.log('회원가입 - 이전 화면');
    setStep(prevStep => prevStep - 1)
  };

  return (
    <View style={Styles.container}>
      <SignUpHeader
        onPress={() => {
          step === 1
            ? navigation.goBack()
            : setStep(prevStep => prevStep - 1)
        }} />

      {/* 회원가입 1 */}
      {step === 1 && (
        <View style={styles.barContainer}>
          <SignUpNameBar />
          <SignUpEmailBar />
          <SignUpPasswordBar />
          <SignUpPhoneBar />
          <View style={styles.ButtonContainer}>
            <DefaultButton
              text="다음으로"
              onPress={() => {
                setStep(prevStep => prevStep + 1);
              }}
            />
          </View>
        </View>)}

      {/* 회원가입 2 */}
      {step === 2 && (
        <View style={styles.barContainer}>
          <SignUpNameBar />
          <SignUpBirthBar />
          <SignUpHeightBar isRequired={false} />
          <SignUpWeightBar isRequired={false} />
          <View style={styles.ButtonContainer}>
            {/* to do : 회원가입 api 연동 */}
            <SignUpButton onPress={() => { navigation.replace('home') }} />
          </View>
        </View>)}

      <View style={styles.textContainer}>
        <Text style={styles.loginText}>계정이 있으신가요? </Text>
        <TouchableOpacity onPress={() => navigation.replace('login')}>
          <Text style={[styles.loginText, styles.highlight]}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    marginTop: getSize(58),
    gap: getSize(30),
    alignItems: 'center',
  },
  ButtonContainer: {
    marginTop: getSize(90),
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: getSize(59),
  },
  loginText: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  highlight: {
    color: Colors.main,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;