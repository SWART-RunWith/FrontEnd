import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CountDown: React.FC = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // 타이머 설정
    if (count > 0) {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={[styles.countText, { fontSize: count > 0 ? 150 : 100 }]}>
        {count > 0 ? count : 'RUN\nWITH'}
      </Text>
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
    fontSize: getSize(100,)
  },
});

export default CountDown;
