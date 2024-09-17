import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  home: undefined;
  "user/profile": undefined;
  "user/setting": undefined;
  "running/countDown": undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "home"
>;

type LoginStackParaList = {
  login: undefined;
  "signup/terms": undefined;
  home: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  LoginStackParaList,
  "login"
>;

type OnboardingStackParamList = {
  home: undefined; // 임시
  onboarding: undefined;
  login: undefined;
  "signup/terms": undefined;
};

export type OnboardingScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  "onboarding"
>;

type SignUpStackParamList = {
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

type RunningStackParamList = {
  "running/countDown": undefined;
  "running/running": undefined;
  "running/finish": {
    seconds: number;
    meters: number;
    pace: string;
    heartRate: number;
  };
  "course-feed/my/save": undefined;
};

export type RunningScreenNavigationProp = StackNavigationProp<
  RunningStackParamList,
  "running/running"
>;

export type RunningFinishScreenRouteProp = RouteProp<
  RunningStackParamList,
  "running/finish"
>;

type CourseFeedStackParamList = {
  "course-feed/my/save": undefined;
};

export type CourseFeedScreenNavigationProp = StackNavigationProp<
  CourseFeedStackParamList,
  "course-feed/my/save"
>;
