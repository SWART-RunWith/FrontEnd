import React from 'react';
import { View, StyleSheet } from 'react-native';

import Loading from '@/components/Loading';
import Colors from '@/constants/Colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;