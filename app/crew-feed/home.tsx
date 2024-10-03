import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  PanResponder,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { getBottomSpace, getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

import SearchIcon from '@/assets/icons/search.svg';
import CrossHairIcon from '@/assets/icons/crosshair.svg';
import RunningIcon from '@/assets/icons/running.svg';
import OptionIcon from '@/assets/icons/option.svg';
import BottomTab from "@/components/BottomTab";
import { CrewBox, CrewFeedBox } from "@/components/box/crew-feed/CrewFeed";
import { BackSearchHeader } from "@/components/header/IconHeader";
import Styles from "@/constants/Styles";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import { CrewFeedScreenNavigationProp } from "@/scripts/navigation";

const { width, height } = Dimensions.get('window');

const crewList = [
  { id: 1, name: '경달', backgroundImg: require('@/assets/images/crew_l.png'), location: '서울시 동대문구 회기동' },
  { id: 2, name: 'KHUMA', backgroundImg: require('@/assets/images/crew2.png'), location: '서울시 광진구 자양동' },
  { id: 3, name: 'RUNWITH', backgroundImg: require('@/assets/images/crew3.png'), location: '서울시 마포구 상암동' },
];

// Example Course Data for Feed
const crewContentList = [
  { id: 1, event: '용산대교 저녁 러닝', time: '2024.08.21', description: '서울 용산대교에서 즐기는 저녁 러닝', backgroundImg: require('@/assets/images/crew1.png'), distance: '5.5KM', location: '서울 용산구', author: 'KHUMA', count: 51, },
  { id: 2, title: '남산 러닝 코스', time: '2024.09.05', description: '남산 둘레길을 따라 달리는 힐링 코스', backgroundImg: require('@/assets/images/crew2.png'), distance: '7.2KM', location: '서울 중구', author: '런윗', count: 36 },
  { id: 3, title: '한강공원 런', time: '2024.08.18', description: '한강공원을 따라 펼쳐지는 시원한 코스', backgroundImg: require('@/assets/images/crew3.png'), distance: '10KM', location: '서울 영등포구', author: '경달', count: 5 },
];

const CrewFeedHomeScreen = () => {
  const navigation = useNavigation<CrewFeedScreenNavigationProp>();

  const [isPanResponderActive, setIsPanResponderActive] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // best 코스 박스
  const CARD_WIDTH = getSize(200);
  const CARD_MARGIN = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 0.05;

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SNAP_INTERVAL);
    setActiveIndex(index);
  };

  const handlePress = (crewId: number) => {
    console.log(crewId, "로 이동");
    // navigation.navigate("course-feed/detail", {
    //   courseId: courseId,
    //   courseIdList: [
    //     courseList[0].id,
    //     courseList[1].id,
    //     courseList[2].id
    //   ]
    // })
  };

  const plusCourse = (crewId: number) => {
    // 코스 추가하는 API 적용
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * SNAP_INTERVAL, animated: true });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: SNAP_INTERVAL, animated: false });
    }, 0);
  }, []);

  // 하단 스와이프
  const [statusBarHeight, setStatusBarHeight] = useState(54);
  const [isCourseFeedScreenVisible, setIsCourseFeedScreenVisible] = useState(false);
  const translateY = useRef(new Animated.Value(getSize(720) + statusBarHeight)).current;

  useEffect(() => {
    let calculatedHeight = 0;
    if (Platform.OS === 'android') {
      calculatedHeight = StatusBar.currentHeight ?? 20;
    } else if (Platform.OS === 'ios') {
      calculatedHeight = getStatusBarHeight(true);
      if (isIphoneX()) {
        calculatedHeight -= getBottomSpace();
      }
    }
    setStatusBarHeight(calculatedHeight);
    console.log(statusBarHeight);

  }, []);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: getSize(720) + statusBarHeight,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [statusBarHeight]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        return;
      }
      translateY.setValue(height + gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -100) {
        Animated.timing(translateY, {
          toValue: statusBarHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setIsCourseFeedScreenVisible(true);
          setIsPanResponderActive(false);
        });
      } else {
        Animated.timing(translateY, {
          toValue: getSize(720) + statusBarHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setIsCourseFeedScreenVisible(false));
      }
    },
  });

  useEffect(() => {
    if (!isCourseFeedScreenVisible) {
      Animated.timing(translateY, {
        toValue: getSize(720) + statusBarHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsPanResponderActive(true);
      });
    }
  }, [isCourseFeedScreenVisible]);

  const [isEndReached, setIsEndReached] = useState(false);

  const loadMoreCourses = () => {
    // if (!isEndReached) {
    //   setTimeout(() => {
    //     if (courseList.length >= bestCourseDummyList.length) {
    //       setIsEndReached(true);
    //     } else {
    //       setCourseList(prevList => [
    //         ...prevList,
    //         ...bestCourseDummyList.slice(prevList.length, prevList.length + 3),
    //       ]);
    //     }
    //   }, 1500);
    // }
  };

  const handlePlus = (courseId: number) => {
    // to do : 저장 api 연결
  }

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('@/assets/images/crew-main.png')}
        style={styles.background}
        blurRadius={5}
      />

      {isCourseFeedScreenVisible && (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          intensity={60}
          tint="dark"
        />
      )}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => { navigation.navigate('crew-feed/search') }}
        >
          <SearchIcon width={getSize(24)} height={getSize(24)} />
        </TouchableOpacity>
        <Text style={styles.title}>RUNWITH</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => { navigation.navigate('crew-feed/map') }}
        >
          <CrossHairIcon width={getSize(26)} height={getSize(26)} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: getSize(36) }} />

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: CARD_MARGIN,
        }}
        style={{
          maxHeight: getSize(248),
        }}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        {crewList.map((course, index) => (
          <Animated.View key={index} style={styles.cardContainer}>
            <CrewBox
              name={course.name}
              onPress={() => handlePress(course.id)}
              onPressButton={() => handlePress(course.id)}
              onPressNext={() => handlePress(course.id)}
              backgroundImg={course.backgroundImg}
            />
          </Animated.View>
        ))}
      </Animated.ScrollView>

      {/* 내 크루 섹션 */}
      <View style={styles.myCrewSection}>
        <Text style={styles.myCrewTitle}>내 크루</Text>
        <TouchableOpacity style={styles.myCrewCard}>
          <ImageBackground
            source={require('@/assets/images/crew2.png')}
            resizeMode="cover"
            style={styles.crewBackgroundImage}
          >
            <TouchableOpacity style={styles.optionIcon}>
              <OptionIcon height={getSize(20.28)} />
            </TouchableOpacity>
            <Text style={styles.crewName}>KHUMA</Text>
            <View style={styles.bottomBlurContainer}>
              <RunningIcon width={getSize(19.2)} height={getSize(24)} />
              <View>
                <Text style={styles.runningDate}>2024.08.21</Text>
                <Text style={styles.runningEvent}>용산대교 저녁 러닝</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.crewFeedScreen,
          { transform: [{ translateY }] }
        ]}
        {...(isPanResponderActive && panResponder.panHandlers)}
      >
        {!isCourseFeedScreenVisible
          ? <Image
            style={{ marginBottom: getSize(-1) }}
            source={require('@/assets/images/swipeUp.png')}
          />
          : <TouchableOpacity
            style={{ marginBottom: getSize(-1) }}
            onPress={() => { setIsCourseFeedScreenVisible(false) }
            }>
            <Image source={require('@/assets/images/swipeDown.png')} />
          </TouchableOpacity>
        }

        <View style={styles.crewFeedContainer}>
          <View style={{ marginTop: -21 }}>
            <BackSearchHeader
              text='RUNWITH'
              fontColor={Colors.main}
              fontFamily={Fonts.hanson}
              onPressBack={() => { setIsCourseFeedScreenVisible(false) }}
              onPressSearch={() => {
                setIsCourseFeedScreenVisible(false);
                navigation.navigate('crew-feed/search');
              }}
            />

            <View style={{ marginTop: getSize(24) }} />

            <FlatList
              style={{
                paddingHorizontal: getSize(Sizes.formMargin),
              }}
              data={crewContentList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: getSize(24) }}>
                  <CrewFeedBox
                    date={item.time}
                    event={item.event}
                    count={item.count}
                    backgroundImg={item.backgroundImg}
                    location={item.location}
                    name={item.author}
                    onPressOption={() => { handlePlus(item.id) }}
                  />
                </View>
              )}
              onEndReached={loadMoreCourses}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      </Animated.View>

      <BottomTab route="CrewFeed" reload={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    height: getSize(414),
    width: '100%',
    top: getSize(104),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize(Sizes.formMargin),
    marginTop: getSize(58),
    height: getSize(29),
    width: width,
  },
  title: {
    fontSize: getSize(20),
    color: Colors.main,
    fontFamily: Fonts.hanson,
  },
  iconContainer: {
    width: getSize(26),
    height: getSize(29),
    justifyContent: 'center',
  },
  cardContainer: {
    width: getSize(200),
    height: getSize(248),
    alignItems: 'center',
  },
  myCrewSection: {
    marginTop: getSize(24),
    width: width,
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  myCrewTitle: {
    fontSize: getSize(16),
    color: 'white',
    fontFamily: Fonts.semiBold,
    height: getSize(19),
  },
  crewBackgroundImage: {
    height: getSize(245),
    width: '100%',
  },
  myCrewCard: {
    height: getSize(245),
    backgroundColor: Colors.darkGrayBox,
    borderRadius: 20,
    marginTop: getSize(17),
    overflow: 'hidden',
  },
  crewName: {
    color: Colors.main,
    fontSize: getSize(32),
    fontFamily: Fonts.semiBold,
    height: getSize(38),
    marginTop: getSize(15),
    marginLeft: getSize(16),
  },
  bottomBlurContainer: {
    marginTop: getSize(141.67),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: getSize(14),
    gap: getSize(12.2),
  },
  runningDate: {
    color: 'white',
    fontSize: getSize(14),
    fontFamily: Fonts.medium,
    height: getSize(17),
  },
  runningEvent: {
    color: Colors.main,
    fontSize: getSize(14),
    fontFamily: Fonts.bold,
    height: getSize(17),
  },
  optionIcon: {
    position: 'absolute',
    alignItems: 'center',
    width: getSize(20),
    height: getSize(20.28),
    top: getSize(15),
    right: getSize(13),
    zIndex: 1,
  },
  crewFeedScreen: {
    position: 'absolute',
    alignItems: 'center',
    height: height,
    width: width,
    top: 0,
    left: 0,
  },
  crewFeedContainer: {
    flex: 1,
    backgroundColor: Colors.darkGrayBox,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: width,
    paddingBottom: getSize(200),
  },
});

export default CrewFeedHomeScreen;