import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View
} from "react-native"
import MapView, { MapMarker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';

import LocationIcon from '@/assets/icons/location.svg';
import CrewLocationList from '@/assets/dummy/crewLocationList.json';
import { BackSearchHeader } from "@/components/header/IconHeader";
import Styles from "@/constants/Styles";
import MapStyles from '@/constants/mapStyles.json';
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import getSize from "@/scripts/getSize";
import { CrewFeedScreenNavigationProp } from "@/scripts/navigation";
import { CrewFeedMapBox } from "@/components/box/crew-feed/MapBox";

const { width } = Dimensions.get('window');

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

interface CrewLocation {
  latitude: number;
  longitude: number;
  crewId: number;
  name: string;
  location: string;
  imageUrl: string;
  content: string;
}

const CrewMapScreen = () => {
  const navigation = useNavigation<CrewFeedScreenNavigationProp>();

  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [crewData, setCrewData] = useState<CrewLocation[]>([]);
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
      setCrewData(CrewLocationList);
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
          followsUserLocation={true}
        >
          {crewData.map((crew) => (
            <MapMarker
              key={crew.crewId}
              coordinate={{
                latitude: crew.latitude,
                longitude: crew.longitude
              }}
              title={crew.name}
              description={crew.content}
            >
              <LocationIcon width={getSize(27.28)} height={getSize(38)} />
              <View style={styles.crewImageContainer}>
                <Image
                  source={{ uri: crew.imageUrl }}
                  style={styles.crewImage}
                />
              </View>
            </MapMarker>
          ))}
        </MapView>
      }

      <View style={styles.headerBox}>
        <BackSearchHeader
          text='RUNWITH'
          fontColor={Colors.main}
          fontFamily={Fonts.hanson}
          onPressSearch={() => {
            navigation.navigate('crew-feed/search');
          }}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentView}
        horizontal
      >
        {crewData.map((crew) => (
          <CrewFeedMapBox
            key={crew.crewId}
            content={crew.content}
            crewId={crew.crewId}
            location={crew.location}
            name={crew.name}
            onPressButton={() => { }}
            onPressOption={() => { }}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerBox: {
    backgroundColor: Colors.background,
    width: '100%',
    height: getSize(104),
  },
  crewImageContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    width: getSize(18.5),
    height: getSize(18.5),
    borderRadius: 100,
    overflow: 'hidden',
    top: getSize(3.9),
    left: getSize(4.38),
  },
  crewImage: {
    width: getSize(18.5),
    height: getSize(18.5),
    resizeMode: 'cover',
  },
  scrollView: {
    position: 'absolute',
    backgroundColor: 'white',
    height: getSize(240),
    width: width * 3,
    bottom: 0,
  },
  scrollContentView: {

  }
})

export default CrewMapScreen;