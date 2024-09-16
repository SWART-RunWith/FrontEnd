import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  EndButton,
  PauseButton,
  PlayButton
} from '@/components/button/RunningButton';
import { RunningScreenNavigationProp } from '@/scripts/navigation';
import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';

const RunningScreen = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();

  const [seconds, setSeconds] = useState(0);
  const [meters, setMeters] = useState(0);
  const [pace, setPace] = useState("0'00\"");
  const [heartRate, setHeartRate] = useState(120);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
        const newPace = calculatePace(seconds + 1, meters);
        setPace(newPace);
        setMeters(prev => prev + 5);
        updateHeartRate();

      }, 1000);
    } else if (isPaused && seconds !== 0) {
      return () => clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPaused, seconds]);

  // 심박수 랜덤
  const updateHeartRate = () => {
    const minHeartRate = 100;
    const maxHeartRate = 180;
    const randomChange = Math.floor(Math.random() * 11) - 3;
    let newHeartRate = heartRate + randomChange;

    if (newHeartRate < minHeartRate) newHeartRate = minHeartRate;
    if (newHeartRate > maxHeartRate) newHeartRate = maxHeartRate;

    setHeartRate(newHeartRate);
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDistance = (meters: number) => {
    const km = Math.floor(meters / 1000);
    const m = Math.floor((meters % 1000) / 10);
    return `${km.toString().padStart(2, '0')}.${m.toString().padStart(2, '0')}`;
  };

  const calculatePace = (
    timeInSeconds: number,
    distanceInMeters: number
  ): string => {
    if (distanceInMeters === 0) return "0'00\"";

    const distanceInKm = distanceInMeters / 1000;
    const totalMinutes = timeInSeconds / 60;
    const pace = totalMinutes / distanceInKm;

    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);

    return `${minutes}'${seconds < 10 ? '0' : ''}${seconds}"`;
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    navigation.replace('running/finish');
  };

  return (
    <View style={Styles.container}>
      {/* 상단 러닝 정보 */}
      <View style={[
        styles.infoContainer,
        isPaused && styles.pausedInfoContainer
      ]}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>현재 러닝 정보</Text>
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
          <Text style={styles.distanceText}>{formatDistance(meters)}KM</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statContainer}>
              <Text style={styles.statLabelText}>페이스</Text>
              <Text style={styles.statText}>{pace}</Text>
            </View>

            <View style={styles.statContainer}>
              <Text style={styles.statLabelText}>심박수</Text>
              <View style={styles.heartContainer}>
                <Text style={styles.statText}>{heartRate}</Text>
                <EmptyHeartIcon />
              </View>
            </View>
          </View>
        </View>

        <Image style={styles.imageStyle} source={isPaused
          ? require('@/assets/images/stop-c.png')
          : require('@/assets/images/running-c.png')
        } />
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
  infoContainer: {
    width: '100%',
    height: getSize(236),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingHorizontal: getSize(16),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  pausedInfoContainer: {
    height: '50%', // 일시정지 시 화면 확장
  },
  textContainer: {
    marginTop: getSize(48),
  },
  headerText: {
    fontSize: getSize(24),
    fontFamily: 'Pretendard-Bold',
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: getSize(20),
    fontFamily: 'Pretendard-SemiBold',
    color: '#FFFFFF',
    marginTop: getSize(14),
  },
  distanceText: {
    fontSize: getSize(50),
    color: Colors.main,
    fontFamily: 'Pretendard-Black',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: getSize(17),
    gap: getSize(20),
  },
  statContainer: {
    flexDirection: 'row',
    gap: getSize(14),
    alignItems: 'flex-end',
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getSize(8),
  },
  statLabelText: {
    fontSize: getSize(18),
    fontFamily: 'Pretendard-Bold',
    color: '#FFFFFF',
  },
  statText: {
    fontSize: getSize(20),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
  imageStyle: {
    width: getSize(77),
    height: getSize(144),
    marginTop: getSize(54),
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getSize(92),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RunningScreen;
