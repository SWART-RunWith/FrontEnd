import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { LoginScreenNavigationProp } from '@/scripts/navigation';
import {
  SignUpBirthBar,
  SignUpEmailBar,
  SignUpHeightBar,
  SignUpNameBar,
  SignUpPasswordBar,
  SignUpPhoneBar,
  SignUpWeightBar
} from '@/components/bar/SignUpBar';
import { SignUpHeader } from '@/components/Header';
import { DefaultButton, SignUpButton } from '@/components/button/Button';
import Colors from '@/constants/Colors';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // 현재 화면의 단계를 관리하는 상태
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={Styles.keyboardScroll}
          extraScrollHeight={getSize(20)}
        >
          <SignUpHeader
            onPress={() => {
              step === 1
                ? navigation.goBack()
                : setStep(prevStep => prevStep - 1)
            }} />

          {/* 회원가입 1 */}
          {step === 1 && (
            <View style={styles.barContainer}>
              <SignUpNameBar
                value={name}
                onChangeText={setName}
              />
              <SignUpEmailBar
                value={email}
                onChangeText={setEmail}
              />
              <SignUpPasswordBar
                value={password}
                onChangeText={setPassword}
              />
              <SignUpPhoneBar
                value={phone}
                onChangeText={setPhone}
              />
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
              <SignUpBirthBar
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
              <SignUpHeightBar
                isRequired={false}
                value={height}
                onChangeText={setHeight}
              />
              <SignUpWeightBar
                isRequired={false}
                value={weight}
                onChangeText={setWeight}
              />
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
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View >
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