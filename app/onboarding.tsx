import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  onboarding: undefined;
  home: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'onboarding'>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('home');
  };

  return (
    <Onboarding
      containerStyles={styles.container}
      pages={[
        {
          backgroundColor: Colors.background,
          image: (
            <Image
              source={require('@/assets/images/onboarding1.png')}
              style={styles.image}
            />
          ),
          title: <Text style={styles.title}>같이 그리는 코스, Runwith</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              직접 뛰며 나만의 러닝 코스를 그려보세요.{"\n"}
              내가 그린 코스를 저장하고 언제든 뛰어보세요.
            </Text>
          ),
        },
        {
          backgroundColor: Colors.background,
          image: (
            <Image
              source={require('@/assets/images/onboarding2.png')}
              style={[styles.image, { width: width * 0.6, height: height * 0.4 }]}
            />
          ),
          title: <Text style={styles.title}>나만의 코스를 공유하고 싶다면</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              숨겨진 근처 러닝 코스를 공유해보세요.{"\n"}
              다른 러너들의 코스 정보도 알 수 있어요.
            </Text>
          ),
        },
        {
          backgroundColor: Colors.background,
          image: (
            <Image
              source={require('@/assets/images/onboarding3.png')}
              style={[styles.image, { width: width * 0.6, height: height * 0.4 }]}
            />
          ),
          title: <Text style={styles.title}>크루와 더욱 즐겁게</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              러닝 크루와의 소통으로 동기부여를 받아보세요.{"\n"}
              크루 멤버와 즐거운 비대면 러닝도 즐길 수 있어요.
            </Text>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Colors.background
  },
  image: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-ExtraBold',
    color: Colors.main,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OnboardingScreen;