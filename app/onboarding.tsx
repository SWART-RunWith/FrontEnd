import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Onboarding from 'react-native-onboarding-swiper';
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

import Colors from '@/constants/Colors';

type RootStackParamList = {
    Home: undefined;
    Onboarding: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Onboarding'
>;

type Props = {
    navigation: OnboardingScreenNavigationProp;
};

const loadFonts = () => {
    return Font.loadAsync({
        'Pretendard-ExtraBold': require('@/assets/fonts/Pretendard-ExtraBold.otf'),
        'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.otf'),
    });
};

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        loadFonts().then(() => setFontLoaded(true));
    }, []);

    if (!fontLoaded) {
        return <AppLoading />;
    }

    return (
        <Onboarding
            onSkip={() => navigation.replace('Home')}
            onDone={() => navigation.replace('Home')}
            pages={[
                {
                    backgroundColor: Colors.background,
                    image: <Image source={require('@/assets/images/onboarding1.png')} style={styles.image} />,
                    title: <Text style={styles.title}>같이 그리는 코스, Runwith</Text>,
                    subtitle: <Text style={styles.subtitle}>
                        직접 뛰며 나만의 러닝 코스를 그려보세요.\n
                        내가 그린 코스를 저장하고 언제든 뛰어보세요.
                    </Text>,
                },
                {
                    backgroundColor: Colors.background,
                    image: <Image source={require('@/assets/images/onboarding2.png')} style={styles.image} />,
                    title: <Text style={styles.title}>나만의 코스를 공유하고 싶다면</Text>,
                    subtitle: <Text style={styles.subtitle}>
                        숨겨진 근처 러닝 코스를 공유해보세요.\n
                        다른 러너들의 코스 정보도 알 수 있어요.
                    </Text>,
                },
                {
                    backgroundColor: Colors.background,
                    image: <Image source={require('@/assets/images/onboarding3.png')} style={styles.image} />,
                    title: <Text style={styles.title}>크루와 더욱 즐겁게</Text>,
                    subtitle: <Text style={styles.subtitle}>
                        러닝 크루와의 소통으로 동기부여를 받아보세요.\n
                        크루 멤버와 즐거운 비대면 러닝도 즐길 수 있어요.
                    </Text>,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: width * 0.8,
        height: height * 0.5,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Pretendard-ExtraBold',
        color: '#B0FF4D',
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
