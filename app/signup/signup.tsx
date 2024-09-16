import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { SignUpScreenNavigationProp } from '@/scripts/navigation';
import {
  SignUpDateOfBirthBar,
  SignUpEmailBar,
  SignUpGenderBar,
  SignUpHeightBar,
  SignUpNameBar,
  SignUpPasswordBar,
  SignUpPhoneBar,
  SignUpWeightBar
} from '@/components/bar/SignUpBar';
import { SignUpHeader } from '@/components/header/IconHeader';
import { DefaultButton, SignUpButton } from '@/components/button/Button';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const { width } = Dimensions.get('window');

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedGender, setSelectedGender] = useState<'남성' | '여성' | null>(null);

  return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={Styles.keyboardScroll}
          extraScrollHeight={getSize(20)}
        >
          <SignUpHeader
            onPressBack={() => {
              step === 1
                ? navigation.replace('signup/terms')
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
              <SignUpGenderBar
                selectedGender={selectedGender}
                onSelectGender={setSelectedGender}
              />
              <SignUpDateOfBirthBar
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
                <SignUpButton onPress={() => { navigation.replace('signup/profile') }} />
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
    gap: getSize(32),
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