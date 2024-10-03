import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
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
import apiClient from "@/axois";

import SearchIcon from '@/assets/icons/search.svg';
import CrossHairIcon from '@/assets/icons/crosshair.svg';
import RunningIcon from '@/assets/icons/running.svg';
import OptionIcon from '@/assets/icons/option.svg';
import BackIcon from '@/assets/icons/back.svg';
import LocationIcon from '@/assets/icons/location.svg';
import NoticeIcon from '@/assets/icons/notice.svg';
import UserIcon from '@/assets/icons/user.svg';
import BottomTab from "@/components/BottomTab";
import { CrewBox, CrewFeedBox } from "@/components/box/crew-feed/CrewFeed";
import { BackSearchHeader } from "@/components/header/IconHeader";
import { UserCountIcon } from "@/components/Icon";
import Styles from "@/constants/Styles";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import { CrewFeedScreenNavigationProp } from "@/scripts/navigation";
import { formatDistance } from "@/scripts/format";

const { width, height } = Dimensions.get('window');

const crewBestList = [
  { id: 1, name: '경달', backgroundImg: require('@/assets/images/crew_l.png'), location: '서울시 동대문구 회기동' },
  { id: 2, name: 'KHUMA', backgroundImg: require('@/assets/images/crew2.png'), location: '서울시 광진구 자양동' },
  { id: 3, name: 'RUNWITH', backgroundImg: require('@/assets/images/crew3.png'), location: '서울시 마포구 상암동' },
];

// Example Course Data for Feed
const crewContentList = [
  { id: 1, event: '용산대교 저녁 러닝', time: '2024.08.21', description: '서울 용산대교에서 즐기는 저녁 러닝', backgroundImg: require('@/assets/images/crew1.png'), distance: '5.5KM', location: '서울 용산구', author: 'KHUMA', count: 51, content: "어쩌구" },
  { id: 2, event: '남산 러닝 코스', time: '2024.09.05', description: '남산 둘레길을 따라 달리는 힐링 코스', backgroundImg: require('@/assets/images/crew2.png'), distance: '7.2KM', location: '서울 중구', author: '런윗', count: 36, content: '어쩌구' },
  { id: 3, event: '한강공원 런', time: '2024.08.18', description: '한강공원을 따라 펼쳐지는 시원한 코스', backgroundImg: require('@/assets/images/crew3.png'), distance: '10KM', location: '서울 영등포구', author: '경달', count: 5, content: 'ㅈ저쩌구' },
];

interface CrewFeed {
  id: number;
  event: string;
  time: string;
  description: string;
  backgroundImg: string;
  distance: number;
  content: string;
  location: string;
  author: string;
  count: number;
}

interface CrewInfo {
  id: number;
  name: string;
  location: string;
  count: number;
  ruleTitle: string;
  ruleContent: string;
}

interface MyCrew {
  id: number;
  name: string;
}

interface Rank {
  id: number;
  name: string;
  distance: number;
}

const CrewFeedHomeScreen = () => {
  const navigation = useNavigation<CrewFeedScreenNavigationProp>();

  const [isAll, setIsAll] = useState(true);

  const [crewList, setCrewList] = useState<MyCrew[]>([]);
  const [crewInfo, setCrewInfo] = useState<CrewInfo>({
    id: 0,
    name: '',
    location: '',
    count: 0,
    ruleTitle: '',
    ruleContent: '',
  });
  const [rankList, setRankList] = useState<Rank[]>([]);
  const [crewFeedList, setCrewFeedList] = useState<CrewFeed[]>([]);

  const [isPanResponderActive, setIsPanResponderActive] = useState(true);
  const [visibleCrewSelectModal, setVisibleCrewSelectModal] = useState(false);
  const [isExpandedNotice, setIsExpandedNotice] = useState(false);
  const [visibleContent, setVisibleContent] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const numPages = crewFeedList.length;

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // best 코스 박스
  const CARD_WIDTH = getSize(200);
  const CARD_MARGIN = (width - CARD_WIDTH) / 2;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 0.05;

  const handleScrollX = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SNAP_INTERVAL);
    setActiveIndex(index);
  };

  useEffect(() => {
    fetchMyCrewIdList();
  }, []);

  // api
  const fetchMyCrewIdList = async () => {
    try {
      const response = await apiClient.get(`/crews/my`);
      setCrewList(response.data);
    } catch (error) {
      console.error('내 크루 아이디 불러오는 중 오류 발생:', error);
    }
  }

  const fetchAllCrewFeed = async () => {
    setIsAll(true);

  }

  const fetchCrewInfo = async (crewId: number) => {
    setIsAll(false);
    try {
      const response = await apiClient.get(`/crews/${crewId}`);
      setCrewInfo(response.data);
    } catch (error) {
      console.error('크루 피드 불러오는 중 오류 발생:', error);
    }
  }

  const fetchRank = async (crewId: number) => {
    try {
      const response = await apiClient.get(`/crews/${crewId}/rank`);
      const updatedRankList = response.data;

      const newRankList = updatedRankList.map((rank: Rank) => ({
        id: rank.id || 0,
        name: rank.name || '뛰기만 하면 당신 차례!',
        distance: rank.distance || 0,
      }));

      while (newRankList.length < 3) {
        newRankList.push({ id: newRankList.length + 1, name: '뛰기만 하면 당신 차례!', distance: 0 });
      }

      setRankList(newRankList);
    } catch (error) {
      console.error('크루 피드 불러오는 중 오류 발생:', error);
    }
  }

  const fetchCrewFeed = async (crewId: number) => {
    const updatedCrewFeedList = crewContentList.slice(0, 3).map(feed => ({
      ...feed,
      distance: parseFloat(feed.distance) // distance 값을 number로 변환
    }));

    console.log(updatedCrewFeedList);
    setCrewFeedList(updatedCrewFeedList);
  }

  // 크루 선택
  const handleSelectCrew = (crewId: number) => {
    fetchCrewInfo(crewId);
    fetchCrewFeed(crewId);
    fetchRank(crewId);
  }

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

  // 수평 크루 피드 스크롤
  const handleCrewFeedScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    setVisibleContent(false);
    setScrollPosition(pageIndex);
  };

  // 모달 설정
  const toggleModal = () => {
    setVisibleCrewSelectModal(!visibleCrewSelectModal);
  }

  const toggleExpandedNotice = () => {
    setIsExpandedNotice(!isExpandedNotice);
  }

  const toggleContentVisible = () => {
    setVisibleContent(!visibleContent);
  }

  // 등수
  const rankScrollX = useRef(new Animated.Value(0)).current;
  const rankScrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let position = 0;
    const interval = setInterval(() => {
      position = (position + 1) % rankList.length;
      rankScrollViewRef.current?.scrollTo({ x: position * (width - getSize(Sizes.formMargin * 2)), animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [rankList.length]);

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

      {/* 크루 좌우 스크롤 */}
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
          { useNativeDriver: true, listener: handleScrollX }
        )}
        scrollEventThrottle={16}
      >
        {crewBestList.map((crew, index) => (
          <Animated.View key={index} style={styles.cardContainer}>
            <CrewBox
              name={crew.name}
              onPress={() => handlePress(crew.id)}
              onPressButton={() => handlePress(crew.id)}
              onPressNext={() => handlePress(crew.id)}
              backgroundImg={crew.backgroundImg}
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

      {/* 하단 팝업 */}
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
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => { setIsCourseFeedScreenVisible(false) }}
              >
                <BackIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: getSize(29) }}
                onPress={toggleModal}
              >
                <Text style={{
                  color: Colors.main,
                  fontFamily: Fonts.hanson,
                  fontSize: getSize(20),
                  height: getSize(21),
                }}>RUNWITH</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsCourseFeedScreenVisible(false);
                  navigation.navigate('crew-feed/search');
                }}
              >
                <SearchIcon width={getSize(24)} height={getSize(24)} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: getSize(24) }} />

            {isAll ?
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
              /> :
              <View>
                {/* 크루 위치 & 이름 */}
                <View style={styles.introContainer}>
                  <View style={styles.locationContainer}>
                    <LocationIcon width={getSize(17)} height={getSize(24)} />
                    <Text style={styles.location}>{crewInfo.location}</Text>
                    <View style={styles.userIcon}>
                      <UserCountIcon count={crewInfo.count} />
                    </View>
                  </View>
                  <Text style={styles.crewInfoName}>{crewInfo.name}</Text>
                </View>

                <TouchableOpacity onPress={toggleExpandedNotice} style={[
                  styles.ruleContainer,
                  isExpandedNotice && { height: getSize(180) }
                ]}
                >
                  <View style={styles.ruleTitleContainer}>
                    <NoticeIcon width={getSize(22.94)} height={getSize(24)} />
                    <Text
                      style={styles.ruleTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {crewInfo.ruleTitle}
                    </Text>
                  </View>
                  <Text style={[
                    styles.ruleContent,
                    isExpandedNotice && { height: getSize(109) }
                  ]}>{crewInfo.ruleContent}</Text>
                </TouchableOpacity>

                {/* 코스 내용 */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                  }}
                  contentContainerStyle={{
                    flexGrow: 1,
                    minHeight: getSize(720),
                    marginBottom: getSize(90),
                    paddingBottom: getSize(100),
                  }}
                >
                  <ScrollView
                    style={styles.scrollView}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContentView}
                    onScroll={handleCrewFeedScroll} // 스크롤 핸들러
                    scrollEventThrottle={16}
                  >
                    {crewFeedList.map((item, pageIndex) => (
                      <View key={item.id} style={styles.vertical}>
                        <TouchableOpacity
                          style={styles.slideBox}
                          onPress={toggleContentVisible}
                        >
                          <CrewFeedBox
                            date={item.time}
                            event={item.event}
                            count={item.count}
                            backgroundImg={item.backgroundImg}
                            location={item.location}
                            name={item.author}
                            onPressOption={() => { handlePlus(item.id) }}
                          />
                        </TouchableOpacity>

                        {visibleContent &&
                          <View style={styles.contentContainer}>
                            <View>
                              <Text>{item.content}</Text>
                            </View>
                          </View>
                        }
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.dotContainer}>
                    {Array.from({ length: numPages }).map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          scrollPosition === index && { backgroundColor: '#D9D9D9' }
                        ]}
                      />
                    ))}
                  </View>

                  <View style={styles.rankScrollContainer}>
                    <ScrollView
                      ref={rankScrollViewRef}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={16}
                      style={{ flexDirection: 'row' }}
                    >
                      {rankList.map((rank, index) => (
                        <View key={rank.id} style={styles.rankBox}>
                          <Text style={styles.rankNumber}>{index + 1}</Text>
                          <View style={{ marginLeft: getSize(13.7) }}>
                            <UserIcon width={getSize(34)} height={getSize(34)} />
                          </View>
                          <Text style={styles.rankName}>{rank.name}</Text>
                          <Text style={styles.rankDistance}>{formatDistance(rank.distance)} KM</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </ScrollView>
              </View>
            }
          </View>
        </View>
      </Animated.View >

      <BottomTab route="CrewFeed" reload={false} />

      <Modal
        transparent={true}
        visible={visibleCrewSelectModal}
        animationType="fade"
        onRequestClose={toggleModal}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleModal}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={fetchAllCrewFeed}
            >
              <Text style={styles.menuText}>전체</Text>
            </TouchableOpacity>

            {crewList.map((crew, index) => (
              <React.Fragment key={crew.id}>
                <View style={styles.bar} />
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    {
                      handleSelectCrew(crew.id)
                      toggleModal();
                    }
                  }}
                >
                  <Text style={[
                    styles.menuText,
                    { color: Colors.main }
                  ]}>{crew.name}</Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View >
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
  introContainer: {
    marginLeft: getSize(26),
  },
  locationContainer: {
    flexDirection: 'row',
    gap: getSize(6),
    alignItems: 'center',
  },
  location: {
    color: 'white',
    fontSize: getSize(14),
    fontFamily: Fonts.semiBold,
    height: getSize(17),
  },
  crewInfoName: {
    color: Colors.main,
    fontSize: getSize(36),
    fontFamily: Fonts.bold,
    height: getSize(43),
  },
  userIcon: {
    position: 'absolute',
    right: getSize(16),
    top: getSize(10.5),
  },
  ruleContainer: {
    backgroundColor: Colors.grayBox,
    borderRadius: 22,
    paddingHorizontal: getSize(14),
    paddingVertical: getSize(10),
    marginHorizontal: getSize(Sizes.formMargin),
    marginTop: getSize(24),
    marginBottom: getSize(28),
    width: width - getSize(Sizes.formMargin * 2),
    height: getSize(80),
  },
  ruleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: getSize(8),
    height: getSize(29),
  },
  ruleTitle: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    height: getSize(19),
  },
  ruleContent: {
    color: Colors.gray,
    fontSize: getSize(14),
    fontFamily: Fonts.medium,
    marginTop: getSize(10),
    width: '100%',
    height: getSize(17),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    width: getSize(155),
    top: getSize(129),
    left: (width - getSize(155)) / 2,
  },
  menuItem: {
    paddingHorizontal: getSize(14),
    justifyContent: 'center',
    alignItems: 'center',
    height: getSize(56),
    width: '100%',
  },
  menuText: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.medium,
    textAlign: 'center',
    height: getSize(19),
  },
  bar: {
    backgroundColor: Colors.lightestGray,
    height: getSize(1),
    width: '100%',
  },
  rankScrollContainer: {
    marginTop: getSize(11),
    height: getSize(58),
    width: width,
    paddingHorizontal: getSize(Sizes.formMargin),
    marginBottom: getSize(90),
  },
  rankBox: {
    backgroundColor: Colors.grayBox,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    width: width - getSize(Sizes.formMargin * 2),
    height: getSize(58),
  },
  rankNumber: {
    color: Colors.main,
    fontSize: getSize(40),
    fontFamily: Fonts.hanson,
    marginLeft: getSize(18),
    height: getSize(42),
    width: getSize(40),
  },
  rankName: {
    color: Colors.main,
    fontSize: getSize(20),
    fontFamily: Fonts.semiBold,
    height: getSize(24),
    marginLeft: getSize(13.5),
  },
  rankDistance: {
    position: 'absolute',
    color: Colors.main,
    fontSize: getSize(20),
    fontFamily: Fonts.medium,
    height: getSize(24),
    right: getSize(23),
  },
  scrollView: {
    width: width,
    bottom: 0,
  },
  scrollContentView: {
    width: width * 3,
  },
  slideBox: {
    paddingHorizontal: getSize(Sizes.formMargin),
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getSize(14),
    marginTop: getSize(12),
    marginBottom: getSize(11),
  },
  dot: {
    height: getSize(7),
    width: getSize(7),
    borderRadius: 100,
    backgroundColor: '#4A4A4A',
  },
  vertical: {

  },
  contentContainer: {
    backgroundColor: Colors.grayBox,
    height: getSize(168),
    width: width - getSize(Sizes.formMargin * 2),
    marginTop: getSize(12),
    marginHorizontal: getSize(Sizes.formMargin),
    padding: getSize(Sizes.formMargin),
  },
});

export default CrewFeedHomeScreen;