import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  login: undefined;
  home: undefined;
  onboarding: undefined;
  "signup/signup": undefined;
  "signup/terms": undefined;
  "signup/profile": undefined;
  "user/profile": undefined;
  "user/setting": undefined;
  "running/countDown": undefined;
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

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "signup/signup"
>;
