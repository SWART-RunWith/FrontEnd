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

  const fadeAnim3 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnimRunWith = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim3, {
      toValue: 0,
      duration: 900,
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
        duration: 900,
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
          duration: 900,
          useNativeDriver: true,
        }).start();

        Animated.timing(fadeAnimRunWith, {
          toValue: 1,
          duration: 900,
          delay: 600,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            navigation.replace('running/running');
          }, 1000);
        });
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.countText, { opacity: fadeAnim3 }]}>
        3
      </Animated.Text>
      <Animated.Text style={[styles.countText, { opacity: fadeAnim2 }]}>
        2
      </Animated.Text>
      <Animated.Text style={[styles.countText, { opacity: fadeAnim1 }]}>
        1
      </Animated.Text>
      <Animated.Text style={[styles.countText, { opacity: fadeAnimRunWith }]}>
        RUN{"\n"}WITH
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
    fontSize: getSize(100),
    position: 'absolute'
  },
});

export default CountDown
