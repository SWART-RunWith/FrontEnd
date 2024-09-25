import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Hanson': require('@/assets/fonts/Hanson-Bold.ttf'),
    'Pretendard-Black': require('@/assets/fonts/Pretendard-Black.ttf'),
    'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-ExtraBold': require('@/assets/fonts/Pretendard-ExtraBold.ttf'),
    'Pretendard-ExtraLight': require('@/assets/fonts/Pretendard-ExtraLight.ttf'),
    'Pretendard-Light': require('@/assets/fonts/Pretendard-Light.ttf'),
    'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Thin': require('@/assets/fonts/Pretendard-Thin.ttf'),
  });

  const hideSplashScreen = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    hideSplashScreen();
  }, [hideSplashScreen]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="signup/signup" />
        <Stack.Screen name='signup/terms' />
        <Stack.Screen name='signup/profile' />
        <Stack.Screen name='user/profile' />
        <Stack.Screen name='user/setting' />
        <Stack.Screen name='running/running' />
        <Stack.Screen name='running/finish' />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
