import { useRef } from "react";
import { Animated } from "react-native";

const useCountdown = () => {
  const fadeAnim3 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnimRunWith = useRef(new Animated.Value(0)).current;

  const startCountdown = (onComplete: () => void) => {
    fadeAnim3.setValue(1);
    fadeAnim2.setValue(0);
    fadeAnim1.setValue(0);
    fadeAnimRunWith.setValue(0);

    Animated.timing(fadeAnim3, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 900,
      delay: 600,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 900,
        delay: 600,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim1, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }).start();

        Animated.timing(fadeAnimRunWith, {
          toValue: 1,
          duration: 900,
          delay: 600,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(fadeAnimRunWith, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }).start(onComplete);
          }, 1000);
        });
      });
    });
  };

  return {
    fadeAnim3,
    fadeAnim2,
    fadeAnim1,
    fadeAnimRunWith,
    startCountdown,
  };
};

export default useCountdown;
