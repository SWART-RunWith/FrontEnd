import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  login: undefined;
  home: undefined;
  onboarding: undefined;
  "signup/signup": undefined;
  "signup/terms": undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "home"
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "login"
>;

export type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "onboarding"
>;
