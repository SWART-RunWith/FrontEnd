import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  onboarding: undefined;
  home: undefined;
};

type OnboardingScreenNavigationProp =
  StackNavigationProp<RootStackParamList, 'onboarding'>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('home');
  };

  const Dot = ({ selected }: { selected: boolean }) => {
    let backgroundColor;

    backgroundColor = selected ? 'white' : '#4A4A4A';

    return (
      <View
        style={{
          width: 7,
          height: 7,
          marginHorizontal: 7,
          backgroundColor,
          borderRadius: 3,
          bottom: getSize(50),
        }}
      />
    );
  };

  return (
    <Onboarding
      showNext={false}
      showSkip={false}
      showDone={false}
      DotComponent={Dot}
      bottomBarColor={Colors.background}
      containerStyles={styles.container}
      pages={[
        {
          backgroundColor: Colors.background,
          image: (
            <Image
              source={require('@/assets/images/onboarding1.png')}
              style={styles.image1}
            />
          ),
          title: (
            <View style={styles.textContainer}>
              <Text style={styles.title}>같이 그리는 코스, Runwith</Text>
              <Text style={styles.subtitle}>
                직접 뛰며 나만의 러닝 코스를 그려보세요.{"\n"}
                내가 그린 코스를 저장하고 언제든 뛰어보세요.
              </Text>
            </View>
          ),
          subtitle: '',
        },
        {
          backgroundColor: Colors.background,
          image: (
            <Image
              source={require('@/assets/images/onboarding2.png')}
              style={styles.image2}
            />
          ),
          title: (
            <View style={styles.textContainer}>
              <Text style={styles.title}>나만의 코스를 공유하고 싶다면</Text>
              <Text style={styles.subtitle}>
                숨겨진 근처 러닝 코스를 공유해보세요.{"\n"}
                다른 러너들의 코스 정보도 알 수 있어요.
              </Text>
            </View>
          ),
          subtitle: '',
        },
        {
          backgroundColor: Colors.background,
          image: (
            <Image
              source={require('@/assets/images/onboarding3.png')}
              style={styles.image3}
            />
          ),
          title: (
            <View style={styles.textContainer}>
              <Text style={styles.title}>크루와 더욱 즐겁게</Text>
              <Text style={styles.subtitle}>
                러닝 크루와의 소통으로 동기부여를 받아보세요.{"\n"}
                크루 멤버와 즐거운 비대면 러닝도 즐길 수 있어요.
              </Text>
            </View>
          ),
          subtitle: '',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
  },
  image1: {
    width: width,
    resizeMode: 'contain',
    marginTop: getSize(325),
  },
  image2: {
    width: width,
    resizeMode: 'contain',
    marginTop: getSize(78),
  },
  image3: {
    width: width,
    resizeMode: 'contain',
    marginTop: getSize(345),
  },
  textContainer: {
    position: 'absolute',
    top: getSize(128),
    left: Sizes.formMargin,
    textAlign: 'left',
  },
  title: {
    fontSize: Sizes.pageTitle,
    fontFamily: 'Pretendard-ExtraBold',
    color: Colors.main,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#FFFFFF',
    marginTop: Sizes.formMargin,
  },
});

export default OnboardingScreen;
