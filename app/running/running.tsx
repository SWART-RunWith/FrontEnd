import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { G, Svg, Polyline as SvgPolyline } from 'react-native-svg';
import MapView, {
  AnimatedRegion,
  Marker,
  Polyline
} from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';

import {
  EndButton,
  PauseButton,
  PlayButton
} from '@/components/button/RunningButton';
import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import MapStyles from '@/constants/mapStyles.json';
import { formatDistance, formatTime } from '@/scripts/format';
import { RunningScreenNavigationProp } from '@/scripts/navigation';
import { calculatePace } from '@/scripts/calcuate/calculatePace';
import getSize from '@/scripts/getSize';
import useCountdown from '@/scripts/countDown';
import { calculateKcal } from '@/scripts/calcuate/calculateKcal';
import BottomTab from '@/components/BottomTab';

const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const RunningScreen = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();

  const { fadeAnim3, fadeAnim2, fadeAnim1, fadeAnimRunWith, startCountdown } = useCountdown();
  const [isCountdownVisible, setIsCountdownVisible] = useState(true);

  const [coordinate, setCoordinate] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  // const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView>(null);
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  // const MarkerAnimated = Animated.createAnimatedComponent(Marker);

  const [isPaused, setIsPaused] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [meters, setMeters] = useState(0);
  const [pace, setPace] = useState("0'00\"");
  const [heartRate, setHeartRate] = useState(0);

  const calcDistance = (newLatLng: {
    latitude: number;
    longitude: number;
  }) => {
    const prevLatLng = routeCoordinates[routeCoordinates.length - 1] || newLatLng;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  const heightAnim = useRef(new Animated.Value(getSize(236))).current;
  const mapHeightAnim = useRef(new Animated.Value(getSize(0))).current;

  const resetState = () => {
    setCoordinate(null);
    setRouteCoordinates([]);
    setMarker(null);
    // setDistanceTravelled(0);
    setPrevLatLng(null);
    setSeconds(0);
    setMeters(0);
    setPace("0'00\"");
    setHeartRate(0);
  };

  const startTracking = () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 300,
        distanceInterval: 1,
      },
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = { latitude, longitude };

        // if (coordinate !== newCoordinate) {
        //   if (Platform.OS === 'android' && markerRef.current) {
        //     markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
        //   } else {

        //   }
        // }

        setCoordinate(newCoordinate);
        setMarker(coordinate);
        setRouteCoordinates((prev) => [...prev, newCoordinate]);
        const distance = calcDistance(newCoordinate);
        setMeters((prev) => prev + distance);
        setPrevLatLng(newCoordinate);
      }
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }
      startCountdown(() => {
        resetState();
        setIsCountdownVisible(false);
        setIsPaused(false);
      });

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCoordinate({ latitude, longitude });
      setRouteCoordinates((prev) => [...prev, { latitude, longitude }]);
    })();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
        startTracking();
        const newPace = calculatePace(seconds + 1, meters);
        setPace(newPace);
        // updateHeartRate();
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

  // 경로 표시
  const convertCoordinatesToSvg = (
    coordinates: { latitude: number; longitude: number }[],
    svgWidth: number,
    svgHeight: number,
    padding: number = 10 // 여유 공간 추가
  ) => {
    if (coordinates.length === 0) return "";

    // 좌표의 최소, 최대값을 찾습니다.
    const minLat = Math.min(...coordinates.map(coord => coord.latitude));
    const maxLat = Math.max(...coordinates.map(coord => coord.latitude));
    const minLon = Math.min(...coordinates.map(coord => coord.longitude));
    const maxLon = Math.max(...coordinates.map(coord => coord.longitude));

    // 위도와 경도의 범위를 계산합니다.
    const latRange = maxLat - minLat;
    const lonRange = maxLon - minLon;

    // 여유 공간을 추가합니다.
    const paddedLatRange = latRange * (1 + padding / 100);
    const paddedLonRange = lonRange * (1 + padding / 100);

    // 각 좌표를 SVG 공간에 맞게 변환합니다.
    return coordinates
      .map(coord => {
        const x = ((coord.longitude - minLon) / paddedLonRange) * (svgWidth - padding) + padding / 2;
        const y = ((maxLat - coord.latitude) / paddedLatRange) * (svgHeight - padding) + padding / 2;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <View style={Styles.container}>
      {/* 카운트다운 모달 */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isCountdownVisible}
        onRequestClose={() => setIsCountdownVisible(false)}
      >
        <View style={styles.modalContainer}>
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
      </Modal>

      {coordinate && (
        <MapView
          // provider="google"
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          mapType='standard'
          customMapStyle={MapStyles}
          userInterfaceStyle='dark'
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={false}
          loadingEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
          >
            <LocationIcon width={getSize(20)} height={getSize(20)} />
          </Marker>

          <Polyline
            coordinates={routeCoordinates}
            strokeColor={Colors.main}
            strokeWidth={getSize(5)}
          />
        </MapView>
      )}

      <Animated.View style={[
        styles.topContainer,
        { height: heightAnim }
      ]}>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <View style={{ height: getSize(29) }}>
              <Text style={styles.headerText}>현재 러닝 정보</Text>
            </View>
            <View style={{ height: getSize(24), marginTop: getSize(14) }}>
              <Text style={styles.timeText}>{formatTime(seconds)}</Text>
            </View>
            <View style={{ height: getSize(60) }}>
              <Text style={styles.distanceText}>{formatDistance(meters)}KM</Text>
            </View>

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
        >
          <Svg height="100%" width="100%" style={{ padding: 10 }}>
            <G>
              <SvgPolyline
                points={convertCoordinatesToSvg(routeCoordinates, width - 20, getSize(166))}
                fill="none"
                stroke={Colors.main}
                strokeWidth={getSize(3)}
              />
            </G>
          </Svg>
        </Animated.View>

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
    overflow: 'hidden',
  },
  textContainer: {
    marginTop: getSize(48),
    height: getSize(168),
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
    bottom: getSize(132),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getSize(36),
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
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

export default RunningScreen;
