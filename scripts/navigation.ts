import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  home: undefined;
  "user/profile": undefined;
  "user/setting": undefined;
  "running/countDown": undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "home"
>;

export type LoginStackParaList = {
  login: undefined;
  "signup/terms": undefined;
  home: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  LoginStackParaList,
  "login"
>;

export type OnboardingStackParamList = {
  home: undefined; // 임시
  onboarding: undefined;
  login: undefined;
  "signup/terms": undefined;
};

export type OnboardingScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "onboarding"
>;

export type SignUpStackParamList = {
  "signup/terms": undefined;
  "signup/signup": undefined;
  "signup/profile": undefined;
  login: undefined;
  home: undefined;
};

export type SignUpScreenNavigationProp = StackNavigationProp<
  SignUpStackParamList,
  "signup/terms"
>;

export type RunningStackParamList = {
  "running/countDown": undefined;
  "running/running": undefined;
  "running/finish": undefined;
};

export type RunningScreenNavigationProp = StackNavigationProp<
  RunningStackParamList,
  "running/countDown"
>;
