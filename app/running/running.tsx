import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RunningScreenNavigationProp, RunningStackParamList } from '@/scripts/navigation';
import { EndButton, PauseButton, PlayButton } from '@/components/button/RunningButton';

const RunningScreen = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();

  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    navigation.replace('running/finish');
  };

  return (
    <View style={styles.container}>
      {/* 상단 러닝 정보 */}
      <View style={[styles.infoContainer, isPaused && styles.pausedInfoContainer]}>
        <Text style={styles.headerText}>현재 러닝 정보</Text>
        <Text style={styles.timeText}>10:03:23</Text>
        <Text style={styles.distanceText}>00.00KM</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>페이스 6'04"</Text>
          <Text style={styles.statText}>심박수 111 ♥</Text>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        {isPaused ? (
          <>
            <EndButton onPress={handleStop} />
            <PlayButton onPress={togglePause} />
          </>
        ) : (
          <PauseButton onPress={togglePause} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  pausedInfoContainer: {
    height: '50%', // 일시정지 시 화면 확장
  },
  headerText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  distanceText: {
    fontSize: 48,
    color: '#B0FF3D',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  statText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pauseButton: {
    backgroundColor: '#B0FF3D',
    borderRadius: 50,
    padding: 20,
  },
  controlButton: {
    backgroundColor: '#B0FF3D',
    borderRadius: 50,
    padding: 20,
    marginHorizontal: 10,
  },
});

export default RunningScreen;
