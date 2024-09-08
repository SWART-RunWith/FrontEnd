import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import { StartButton } from '@/components/button/Button';

const { width, height } = Dimensions.get('window');

// 네비게이션 스택 파라미터 리스트 정의
type RootStackParamList = {
  home: undefined;
};

// `navigation`의 타입 지정
type HomeScreenNavigationProp =
  StackNavigationProp<RootStackParamList, 'home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleStartPress = () => {
    // START 버튼을 눌렀을 때의 동작
  };

  return (
    <View style={Styles.container}>
      <Text style={styles.title}>RUNWITH</Text>
      <StartButton
        style={styles.button}
        onPress={() => console.log('START button pressed')}
      />
      <View style={styles.box} />
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