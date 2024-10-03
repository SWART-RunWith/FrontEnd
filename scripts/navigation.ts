import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  home: undefined;
  onboarding: undefined;
  login: undefined;
  "user/profile": undefined;
  "user/setting": undefined;
  "running/running": undefined;
  "running/save": undefined;
  "course-feed/home": undefined;
  "course-feed/my/home": undefined;
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
  home: undefined;
  "running/countDown": undefined;
  "running/running": undefined;
  "running/finish": {
    seconds: number;
    meters: number;
    pace: string;
    heartRate: number;
  };
  "running/save": undefined;
};

export type RunningScreenNavigationProp = StackNavigationProp<
  RunningStackParamList,
  "running/running"
>;

export type RunningFinishScreenRouteProp = RouteProp<
  RunningStackParamList,
  "running/finish"
>;

type CourseFeedMainStackParamList = {
  "course-feed/home": undefined;
  "course-feed/search": undefined;
  "course-feed/detail": {
    courseId: number;
    courseIdList: number[];
  };
  "course-feed/my/home": undefined;
};

export type CourseFeedMainScreenNavigationProp = StackNavigationProp<
  CourseFeedMainStackParamList,
  "course-feed/home"
>;

export type CourseFeedMainScreenRouteProp = RouteProp<
  CourseFeedMainStackParamList,
  "course-feed/detail"
>;

interface Folder {
  name: string;
  id: number;
}

type CourseFeedMineStackParamList = {
  home: undefined;
  "running/save": undefined;
  "course-feed/my/home": undefined;
  "course-feed/my/folder": {
    folderList: Folder[];
  };
  "course-feed/my/folderSearch": undefined;
  "course-feed/my/course": {
    folderId: number;
  };
};

export type CourseFeedMineScreenNavigationProp = StackNavigationProp<
  CourseFeedMineStackParamList,
  "course-feed/my/home"
>;

export type CourseSaveScreenRouteProp = RouteProp<
  CourseFeedMineStackParamList,
  "course-feed/my/course"
>;

export type CourseFolderScreenRouteProp = RouteProp<
  CourseFeedMineStackParamList,
  "course-feed/my/folder"
>;

type CrewFeedStackParamList = {
  "crew-feed/home": undefined;
  "crew-feed/search": undefined;
  "crew-feed/map": undefined;
};

export type CrewFeedScreenNavigationProp = StackNavigationProp<
  CrewFeedStackParamList,
  "crew-feed/home"
>;

type BottomBarStackParamList = {
  home: undefined;
  "course-feed/home": undefined;
  "crew-feed/home": undefined;
  "user/profile": undefined;
  "user/record": undefined;
};

export type BottomBarNavigationProp = StackNavigationProp<
  BottomBarStackParamList,
  "home"
>;
