import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Bar, EmailBar, PasswordBar } from '@/components/Bar';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { LoginButton } from '@/components/Button';
import { LoginHeader } from '@/components/Header';
import { HomeScreenNavigationProp } from '@/scripts/navigation';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <LoginHeader />

      <View style={styles.barContainer}>
        <EmailBar
          value={email}
          onChangeText={setEmail}
        />
        <PasswordBar
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <LoginButton
          onPress={() => {
            console.log('로그인 버튼 클릭');
            // 로그인 처리 로직 추가
          }}
          text="로그인"
        />
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => console.log('아이디 찾기')}>
          <Text style={styles.linkText}>  아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> / </Text>
        <TouchableOpacity onPress={() => console.log('비밀번호 찾기')}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>아직 회원이 아니신가요? </Text>
        <TouchableOpacity onPress={() => navigation.replace('home')}>
          <Text style={[styles.signUpText, styles.highlight]}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    position: 'absolute',
    bottom: getSize(48)
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
