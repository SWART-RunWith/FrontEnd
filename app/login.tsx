import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import { LoginEmailBar, LoginPasswordBar } from '@/components/bar/LoginBar';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { LoginScreenNavigationProp } from '@/scripts/navigation';
import { LoginButton } from '@/components/button/Button';
import { LoginHeader } from '@/components/header/TextOnlyHeader';
import { resetNavigationStack } from '@/scripts/resetNavigationStack';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView contentContainerStyle={Styles.keyboardScroll}>
          <LoginHeader />

          <View style={styles.barContainer}>
            <LoginEmailBar
              value={email}
              onChangeText={setEmail}
            />
            <LoginPasswordBar
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <LoginButton
              onPress={() => {
                console.log('로그인 버튼 클릭');
                resetNavigationStack(navigation, 'home');
              }}
              text="로그인"
            />
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => console.log('아이디 찾기')}>
              <Text style={styles.linkText}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.separator}> / </Text>
            <TouchableOpacity onPress={() => console.log('비밀번호 찾기')}>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>아직 회원이 아니신가요? </Text>
            <TouchableOpacity onPress={() => navigation.replace('signup/terms')}>
              <Text style={[styles.signUpText, styles.highlight]}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, // ScrollView가 자식들을 감쌀 수 있도록 flexGrow 사용
    justifyContent: 'center', // 중앙 정렬
    alignItems: 'center', // 자식 요소들을 중앙으로 배치
  },
  barContainer: {
    marginTop: getSize(140),
    gap: getSize(24),
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: getSize(33),
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: getSize(26),
  },
  linkText: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: getSize(5),
  },
  separator: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: getSize(251),
  },
  signUpText: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  highlight: {
    color: Colors.main,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
