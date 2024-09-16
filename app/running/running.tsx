import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  EndButton,
  PauseButton,
  PlayButton
} from '@/components/button/RunningButton';
import { RunningScreenNavigationProp } from '@/scripts/navigation';
import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';
import { formatDistance, formatTime } from '@/scripts/format';
import { calculatePace } from '@/scripts/calculatePace';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import Sizes from '@/constants/Sizes';

const RunningScreen = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();

  const [isPaused, setIsPaused] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [meters, setMeters] = useState(0);
  const [pace, setPace] = useState("0'00\"");
  const [heartRate, setHeartRate] = useState(120);

  const heightAnim = useRef(new Animated.Value(getSize(236))).current;
  const mapHeightAnim = useRef(new Animated.Value(getSize(0))).current;

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

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isPaused ? getSize(430) : getSize(236),
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.parallel([
      Animated.timing(mapHeightAnim, {
        toValue: isPaused ? getSize(166) : getSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isPaused]);

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

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    navigation.navigate('running/finish', {
      seconds,
      meters,
      pace,
      heartRate,
    });
  };

  return (
    <View style={Styles.container}>
      <Animated.View style={[
        styles.topContainer,
        { height: heightAnim }
      ]}>
        <View style={styles.infoContainer}>
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
        <Animated.View
          style={[
            styles.mapContainer,
            { height: mapHeightAnim }
          ]}
        />

      </Animated.View>

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
  topContainer: {
    width: '100%',
    backgroundColor: '#000',
    height: getSize(236),
    paddingHorizontal: getSize(16),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapContainer: {
    backgroundColor: Colors.grayBox,
    width: '100%',
    height: getSize(166),
    borderRadius: 20,
    marginTop: getSize(26),
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
    gap: getSize(36),
  },
});

export default RunningScreen;
