import AsyncStorage from "@react-native-async-storage/async-storage";

const resetOnboarding = async () => {
  try {
    await AsyncStorage.removeItem("hasSeenOnboarding");
    console.log("Onboarding status reset");
  } catch (error) {
    console.error("Failed to reset onboarding status:", error);
  }
};

export default resetOnboarding;
