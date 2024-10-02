import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View
} from "react-native"
import MapView, { MapMarker } from "react-native-maps";
import * as Location from 'expo-location';

import LocationIcon from '@/assets/icons/location.svg';
import Styles from "@/constants/Styles";
import MapStyles from '@/constants/mapStyles.json';
import getSize from "@/scripts/getSize";

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const CrewMapScreen = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView>(null);

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

  return (
    <View style={Styles.container}>
      {coordinates &&
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
            coordinate={coordinates}
          >
            <LocationIcon width={getSize(27.28)} height={getSize(38)} />
          </MapMarker>
        </MapView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

export default CrewMapScreen;