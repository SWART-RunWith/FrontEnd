import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Runwith from '@/components/Runwith';
import Styles from '@/constants/Styles';

import resetOnboarding from '@/scripts/resetOnboarding';

// navigation
import { OnboardingScreenNavigationProp } from '@/scripts/navigation';

const IndexScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      await resetOnboarding();
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding === 'true') {
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
    <View style={Styles.loading}>
      <Runwith />
    </View>
  );
};

export default IndexScreen;