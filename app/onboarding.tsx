import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import Runwith from '@/components/Runwith';
import { LoginButton, SignUpButton } from '@/components/Button';

// navigation
import { LoginScreenNavigationProp } from '@/scripts/navigation';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [currentPage, setCurrentPage] = useState(0);

  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentPageIndex = Math.round(scrollPosition / width);
    setCurrentPage(currentPageIndex);
  };

  return (
    <View style={Styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 온보딩 1번째 페이지 */}
        <View style={styles.page}>
          <Image
            source={require('@/assets/images/onboarding1.png')}
            style={styles.image1}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>같이 그리는 코스, Runwith</Text>
            <Text style={styles.subtitle}>
              직접 뛰며 나만의 러닝 코스를 그려보세요.{"\n"}
              내가 그린 코스를 저장하고 언제든 뛰어보세요.
            </Text>
          </View>
        </View>

        {/* 온보딩 2번째 페이지 */}
        <View style={styles.page}>
          <Image
            source={require('@/assets/images/onboarding2.png')}
            style={styles.image2}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>나만의 코스를 공유하고 싶다면</Text>
            <Text style={styles.subtitle}>
              숨겨진 근처 러닝 코스를 공유해보세요.{"\n"}
              다른 러너들의 코스 정보도 알 수 있어요.
            </Text>
          </View>
        </View>

        {/* 온보딩 3번째 페이지 */}
        <View style={styles.page}>
          <Image
            source={require('@/assets/images/onboarding3.png')}
            style={styles.image3}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>크루와 더욱 즐겁게</Text>
            <Text style={styles.subtitle}>
              러닝 크루와의 소통으로 동기부여를 받아보세요.{"\n"}
              크루 멤버와 즐거운 비대면 러닝도 즐길 수 있어요.
            </Text>
          </View>
        </View>

        {/* 온보딩 마지막 페이지 */}
        <View style={styles.page}>
          <View style={styles.finalTextContainer}>
            <Runwith />
            <Text style={styles.text1}>이제 뛰어볼까요?</Text>
            <Text style={styles.text2}>런윗과 함께 뛰어볼 차례입니다!</Text>
          </View>
          <View style={styles.buttonContainer}>
            <LoginButton
              onPress={() => {
                console.log('login button pressed');
                handleOnboardingFinish();
                navigation.replace('login');
              }}
              style={{ marginBottom: getSize(20) }}
            />
            <SignUpButton
              onPress={() => {
                console.log('sign up button pressed');
                handleOnboardingFinish();
                navigation.replace('home');
              }}
              isGary={true}
            />
          </View>
        </View>
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : null,
              currentPage === 3 ? styles.hiddenDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image1: {
    width: width,
    height: height,
    resizeMode: 'contain',
    marginTop: getSize(165),
  },
  image2: {
    width: width,
    height: height,
    resizeMode: 'contain',
    marginBottom: getSize(75),
  },
  image3: {
    width: width,
    height: height,
    resizeMode: 'contain',
    marginTop: getSize(177),
  },
  textContainer: {
    position: 'absolute',
    top: getSize(128),
    left: getSize(Sizes.formMargin),
    textAlign: 'left',
  },
  title: {
    fontSize: getSize(Sizes.pageTitle),
    fontFamily: 'Pretendard-ExtraBold',
    color: Colors.main,
  },
  subtitle: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Regular',
    color: '#FFFFFF',
    marginTop: Sizes.formMargin,
  },
  finalTextContainer: {
    position: 'absolute',
    top: getSize(223),
    alignItems: 'center',
    textAlign: 'center',
  },
  text1: {
    fontSize: getSize(30),
    fontFamily: 'Pretendard-SemiBold',
    color: Colors.main,
    marginTop: getSize(165),
  },
  text2: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Regular',
    color: 'white',
    marginTop: getSize(14),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getSize(107),
    alignItems: 'center',

  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: getSize(81),
  },
  dot: {
    width: getSize(7),
    height: getSize(7),
    borderRadius: 100,
    backgroundColor: '#505050',
    marginHorizontal: getSize(7),
  },
  activeDot: {
    backgroundColor: '#D9D9D9',
  },
  hiddenDot: {
    opacity: 0,
  },
});

export default OnboardingScreen;
