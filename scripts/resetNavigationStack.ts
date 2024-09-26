import { CommonActions, NavigationProp } from "@react-navigation/native";

export const resetNavigationStack = (
  navigation: NavigationProp<any>,
  routeName: string
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    })
  );
};
