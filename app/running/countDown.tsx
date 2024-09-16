import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { RunningScreenNavigationProp } from '@/scripts/navigation';

const { width, height } = Dimensions.get('window');

const CountDown: React.FC = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();

  const [count, setCount] = useState(3);
  const numberAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        Animated.parallel([
          Animated.timing(numberAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(numberAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();

        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeout(() => {
        navigation.replace('running/running');
      }, 1000);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[
        styles.countText,
        { opacity: numberAnim }]
      }>
        {count > 0 ? count : 'RUN\nWITH'}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    width: width,
    height: height,
  },
  countText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Hanson',
    fontSize: getSize(100)
  },
});

export default CountDown;
