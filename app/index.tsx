import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '@/components/Loading';
import Colors from '@/constants/Colors';

type RootStackParamList = {
  onboarding: undefined;
  home: undefined;
};

type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'onboarding'>;

const IndexScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding) {
        navigation.replace('home');
      } else {
        navigation.replace('onboarding');
      }
    };

    const timer = setTimeout(() => {
      checkOnboardingStatus();
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default IndexScreen;