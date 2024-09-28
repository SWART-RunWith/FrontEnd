import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchIcon from '@/assets/icons/search.svg';
import SearchItemIcon from '@/assets/icons/searchItem.svg';
import CancelIcon from '@/assets/icons/cancel.svg';
import DeleteIcon from '@/assets/icons/x.svg';
import UserIcon from '@/assets/icons/user.svg';
import { MainGradient } from "@/components/Gradient";
import { BackHeader } from "@/components/header/IconHeader";
import BottomTab from "@/components/BottomTab";
import Styles from "@/constants/Styles";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import Fonts from "@/constants/Fonts";
import getSize from "@/scripts/getSize";

const { width } = Dimensions.get('window');

const MAX_HISTORY = 20;
const STORAGE_KEY = "@search_history";

// 검색 리스트
const formatCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const CourseFeedSearchScreen = () => {
  const [text, setText] = useState('');
  const [searchHistory, setSearchHistory] = useState<{ text: string, time: string }[]>([]);
  const [triggeredByIcon, setTriggeredByIcon] = useState(false);
  const [userName, setUserName] = useState('홍여준');

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedHistory) {
          setSearchHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("검색 기록 로드 실패", error);
      }
    };

    loadSearchHistory();
  }, []);

  useEffect(() => {
    const saveSearchHistory = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
      } catch (error) {
        console.error("검색 기록 저장 실패", error);
      }
    };

    if (searchHistory.length > 0) {
      saveSearchHistory();
    }
  }, [searchHistory]);

  const handleSearch = () => {
    if (!text.trim()) return;

    const currentTime = formatCurrentTime();

    let updatedHistory = [{ text, time: currentTime }, ...searchHistory];

    if (updatedHistory.length > MAX_HISTORY) {
      updatedHistory = updatedHistory.slice(0, MAX_HISTORY);
    }

    setSearchHistory(updatedHistory);
    setText('');
    Keyboard.dismiss();
  };

  const handleSearchIconPress = () => {
    setTriggeredByIcon(true);
    handleSearch();
  };

  const handleEndEditing = () => {
    if (!triggeredByIcon) {
      handleSearch();
    }
    setTriggeredByIcon(false);
  };

  const handleDelete = async (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("검색 기록 삭제 실패", error);
    }
  };

  const handleClearAll = async () => {
    setSearchHistory([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("검색 기록 삭제 실패", error);
    }
  };

  const recentSearches = searchHistory.slice(0, 5);

  // 추천 리스트
  // to do : 추천 api 연결
  const recommendedCourses = [
    { title: '고려런 코스', author: '강은채' },
    { title: '반짝이는 시티뷰 뛰자', author: '신주은' },
    { title: '댕댕런으로 기분 전환', author: '김근민' },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={Styles.container}>
        <MainGradient />
        <BackHeader />

        {/* 검색 바 */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder={"코스 이름, 지역 검색"}
            placeholderTextColor={Colors.placeholder}
            value={text}
            onChangeText={setText}
            onEndEditing={handleEndEditing}
          />
          {text && <TouchableOpacity
            style={styles.cancelIcon}
            onPress={() => { setText('') }}
          >
            <CancelIcon width={getSize(20)} height={getSize(20)} />
          </TouchableOpacity>}
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={handleSearchIconPress}
          >
            <SearchIcon width={getSize(24)} height={getSize(24)} />
          </TouchableOpacity>
        </View>

        {/* 검색 리스트 */}
        <View style={styles.recentSearchesContainer}>
          <Text style={[styles.recentSearchesText, {
            marginLeft: getSize(24),
          }]}>최근 검색</Text>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={[styles.recentSearchesText, {
              marginRight: getSize(16),
            }]}>전체 삭제</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchItemContainer}>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.searchItem}>
                <View style={styles.searchTextContainer}>
                  <SearchItemIcon width={getSize(24)} height={getSize(24)} />
                  <Text style={styles.searchText}>{item.text}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <DeleteIcon width={getSize(16)} height={getSize(16)} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* 추천 리스트 */}
        <View style={styles.recommendContainer}>
          <View style={styles.recommendTitleContainer}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.recommendTitle}>님 이런 코스는 어떠세요?</Text>
          </View>
          {recommendedCourses.map((course, index) => (
            <View key={index} style={styles.recommendItem}>
              <Text style={styles.recommendCourseTitle}>{course.title}</Text>
              <View style={styles.recommendAuthorContainer}>
                <Text style={styles.recommendByText}>by. </Text>
                <View style={{ marginLeft: getSize(12), marginRight: getSize(6) }}>
                  <UserIcon width={getSize(24)} height={getSize(24)} />
                </View>
                <Text style={styles.recommendByText}>{course.author}</Text>
              </View>
            </View>
          ))}
        </View>

        <BottomTab route='CourseFeed' />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Colors.grayBox,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(16),
    marginTop: getSize(32),
    borderRadius: 10,
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(56),
  },
  searchInput: {
    color: 'white',
    fontSize: getSize(18),
    width: width - getSize(Sizes.formMargin) * 4,
  },
  cancelIcon: {
    position: 'absolute',
    justifyContent: 'center',
    right: getSize(52),
    width: getSize(20),
    height: getSize(56),
  },
  searchIcon: {
    position: 'absolute',
    width: getSize(24),
    height: getSize(24),
    right: getSize(Sizes.formMargin),
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getSize(28),
    width: width,
    height: getSize(19),
  },
  recentSearchesText: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    opacity: 0.6,
  },
  searchItemContainer: {
    marginTop: getSize(16),
    paddingLeft: getSize(24),
    paddingRight: getSize(20),
    width: width,
    height: getSize(257),
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: getSize(24),
    marginBottom: getSize(14),
  },
  searchTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(24),
    gap: getSize(14),
  },
  searchText: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
  },
  recommendContainer: {
    width: width,
    paddingHorizontal: getSize(16),
  },
  recommendTitleContainer: {
    flexDirection: 'row',
    marginBottom: getSize(36),
    width: width,
    height: getSize(24),
  },
  userName: {
    color: Colors.main,
    fontSize: getSize(20),
    fontFamily: Fonts.semiBold,
  },
  recommendTitle: {
    color: 'white',
    fontSize: getSize(20),
    fontFamily: Fonts.semiBold,
  },
  recommendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize(15),
    gap: getSize(9),
  },
  recommendCourseTitle: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    width: getSize(200),
  },
  recommendAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendByText: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
  },
});

export default CourseFeedSearchScreen;
