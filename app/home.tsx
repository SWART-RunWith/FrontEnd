import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import MapView, {
  MapMarker,
  Polyline
} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import haversine from 'haversine';

import LocationIcon from '@/assets/icons/location.svg';
import Styles from '@/constants/Styles';
import MapStyles from '@/constants/mapStyles.json';
import { DefaultButton } from '@/components/button/Button';
import { StartButton } from '@/components/button/RunningButton';
import { HomeHeader } from '@/components/header/TextOnlyHeader';
import { HomeScreenNavigationProp } from '@/scripts/navigation';
import getSize from '@/scripts/getSize';

const { width } = Dimensions.get('window');

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setCoordinates({ latitude, longitude });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 300,
          distanceInterval: 1,
        },
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoordinate = { latitude, longitude };
          setCoordinates(newCoordinate);
        }
      );
    })();
  }, []);

  const handleStartPress = () => {
    console.log('START button pressed')
    navigation.replace('running/running');
  };

  return (
    <View style={Styles.container}>
      {coordinates && (
        <MapView
          style={styles.map}
          ref={mapRef}
          customMapStyle={MapStyles}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <MapMarker
            ref={markerRef}
            coordinate={coordinates}
          >
            <LocationIcon />
          </MapMarker>
        </MapView>
      )}

      <HomeHeader />

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
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: getSize(140),
  },
  box: {
    backgroundColor: '#565656',
    position: 'absolute',
    height: getSize(90),
    width: width,
    bottom: 0,
  },
});

export default HomeScreen;
