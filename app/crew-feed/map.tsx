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
import { CrewFeedMapBox } from "@/components/box/crew-feed/MapBox";
import Styles from "@/constants/Styles";
import MapStyles from '@/constants/mapStyles.json';
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import getSize from "@/scripts/getSize";
import { CrewFeedScreenNavigationProp } from "@/scripts/navigation";
import Sizes from "@/constants/Sizes";

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
  const [crewData, setCrewData] = useState<CrewLocation[][]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const mapRef = useRef<MapView>(null);

  const numPages = Math.ceil(crewData.length / 3);

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

      const paginatedCrewData: CrewLocation[][] = [];
      for (let i = 0; i < CrewLocationList.length; i += 3) {
        paginatedCrewData.push(CrewLocationList.slice(i, i + 3));
      }
      setCrewData(paginatedCrewData);
    })();
  }, []);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(contentOffsetX / width);
    setScrollPosition(pageIndex);
  };

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
          {crewData.flat().map((crew) => (
            <MapMarker
              key={crew.crewId}
              coordinate={{
                latitude: crew.latitude,
                longitude: crew.longitude,
              }}
              title={crew.name}
              description={crew.content}
            >
              <LocationIcon width={getSize(27.28)} height={getSize(38)} />
              <View style={styles.crewImageContainer}>
                <Image source={{ uri: crew.imageUrl }} style={styles.crewImage} />
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
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {crewData.map((page, pageIndex) => (
          <View key={pageIndex} style={styles.pageContainer}>
            {page.map((crew) => (
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
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotContainer}>
        {Array.from({ length: numPages }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: scrollPosition === index ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
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
    width: width,
    bottom: 0,
  },
  scrollContentView: {
    width: width * 3,
  },
  pageContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getSize(Sizes.formMargin),
    gap: getSize(Sizes.formMargin * 2),
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: getSize(20),
    left: 0,
    right: 0,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.main,
    marginHorizontal: 4,
  },
})

export default CrewMapScreen;