import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Runwith from '@/components/Runwith';
import Colors from '@/constants/Colors';
import resetOnboarding from '@/scripts/resetOnboarding';

type RootStackParamList = {
  onboarding: undefined;
  home: undefined;
};

type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'onboarding'>;

const IndexScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      await resetOnboarding();
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding === 'true') {
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
      <Runwith />
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