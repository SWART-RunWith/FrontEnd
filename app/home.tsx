import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { StartButton } from '@/components/button/RunningButton';
import { DefaultButton, } from '@/components/button/Button';
import { HomeScreenNavigationProp } from '@/scripts/navigation';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = ({ }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleStartPress = () => {
    console.log('START button pressed')
    navigation.replace('running/countDown');
  };

  return (
    <View style={Styles.container}>
      <Text style={styles.title}>RUNWITH</Text>
      <StartButton
        style={styles.button}
        onPress={() => handleStartPress()}
      />
      <View style={styles.box} />
      <DefaultButton
        style={{
          marginTop: getSize(100),
        }}
        onPress={() => navigation.navigate('user/profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.headerTitle,
    fontFamily: 'Hanson',
    color: Colors.main,
    position: 'absolute',
    top: getSize(62),
    marginBottom: getSize(Sizes.formMargin), // 타이틀 아래 공간 확보
  },
  button: {
    position: 'absolute',
    bottom: getSize(140),
  },
  box: {
    height: getSize(90),
    width: width,
    backgroundColor: '#565656',
    position: 'absolute',
    bottom: 0,
  },
});

export default HomeScreen;