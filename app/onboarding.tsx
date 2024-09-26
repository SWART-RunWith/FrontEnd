import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import { OnboardingScreenNavigationProp } from '@/scripts/navigation';
import { LoginButton, SignUpButton } from '@/components/button/Button';

const { width, height } = Dimensions.get('window');

// styles
const styles = StyleSheet.create({
  page: {
    width: width,
    alignItems: 'center',
  },
  onboardingContainer: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: 'column',
    top: getSize(128),
  },
  textContainer: {
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
  imageContainer: {
    alignContent: 'center',
  },
  image1: {
    width: width,
    height: getSize(405) * width / getSize(390),
    resizeMode: 'contain',
    marginTop: getSize(27),
  },
  image2: {
    width: width,
    height: getSize(398) * width / getSize(390),
    resizeMode: 'contain',
    marginTop: getSize(16),
  },
  image3: {
    width: width,
    height: getSize(456) * width / getSize(390),
    resizeMode: 'contain',
    marginTop: getSize(9),
  },
  finalTextContainer: {
    marginTop: getSize(223),
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    fontSize: getSize(40),
    fontFamily: 'Hanson',
    color: Colors.main,
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

const onboardingData = [
  {
    image: require('@/assets/images/onboarding1.png'),
    title: '같이 그리는 코스, Runwith',
    subtitle: '직접 뛰며 나만의 러닝 코스를 그려보세요.\n내가 그린 코스를 저장하고 언제든 뛰어보세요.',
    imageStyle: styles.image1,
  },
  {
    image: require('@/assets/images/onboarding2.png'),
    title: '나만의 코스를 공유하고 싶다면',
    subtitle: '숨겨진 근처 러닝 코스를 공유해보세요.\n다른 러너들의 코스 정보도 알 수 있어요.',
    imageStyle: styles.image2,
  },
  {
    image: require('@/assets/images/onboarding3.png'),
    title: '크루와 더욱 즐겁게',
    subtitle: '러닝 크루와의 소통으로 동기부여를 받아보세요.\n크루 멤버와 즐거운 비대면 러닝도 즐길 수 있어요.',
    imageStyle: styles.image3,
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
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
        {onboardingData.map((page, index) => (
          <View key={index} style={styles.page}>
            <View style={styles.onboardingContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.subtitle}>{page.subtitle}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image source={page.image} style={page.imageStyle} />
              </View>
            </View>
          </View>
        ))}

        {/* 마지막 페이지 */}
        <View style={styles.page}>
          <View style={styles.finalTextContainer}>
            <Text style={styles.logo}>RUNWITH</Text>
            <Text style={styles.text1}>이제 뛰어볼까요?</Text>
            <Text style={styles.text2}>런윗과 함께 뛰어볼 차례입니다!</Text>
          </View>
          <View style={styles.buttonContainer}>
            <LoginButton
              onPress={() => {
                handleOnboardingFinish();
                navigation.replace('login');
              }}
              style={{ marginBottom: getSize(20) }}
            />
            <SignUpButton
              onPress={() => {
                handleOnboardingFinish();
                navigation.replace('signup/terms');
              }}
              isGary={true}
            />
          </View>
        </View>
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : null,
              currentPage === onboardingData.length ? styles.hiddenDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default OnboardingScreen;
