import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Animated
} from "react-native";
import { useRoute } from "@react-navigation/native";

import LocationIcon from '@/assets/icons/location.svg';
import SearchIcon from '@/assets/icons/search.svg';
import CancelIcon from '@/assets/icons/cancel.svg';
import { BackOptionHeader } from "@/components/header/IconHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import Styles from "@/constants/Styles";
import getSize from "@/scripts/getSize";
import { CourseSaveScreenRouteProp } from "@/scripts/navigation";
import { CourseBox } from "@/components/box/CourseFeed";

const { width } = Dimensions.get('window');

const MyCourseScreen = () => {
  const route = useRoute<CourseSaveScreenRouteProp>();
  const { folderId } = route.params;

  const [courseName, setCourseName] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);

  const toggleModal = () => setVisibleModal(!visibleModal);

  const folderName = '서천동';
  const courseList = [
    { id: 1, title: '경희대 - 서천 최애 달립니다 야호', time: '00:40:28', distance: '03.66KM' },
    { id: 2, title: '업힐 훈련', time: '01:20:14', distance: '04.30KM' },
    { id: 3, title: '반달런', time: '00:31:25', distance: '02.58KM' },
    { id: 4, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 5, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 6, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 7, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 8, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 9, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 10, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
    { id: 11, title: '사색러닝', time: '00:20:50', distance: '01.08KM' },
  ];


  const searchIconAnim = useRef(new Animated.Value(0)).current;
  const cancelIconOpacity = useRef(new Animated.Value(0)).current;
  const [showCancelIcon, setShowCancelIcon] = useState(false);

  const handleInputFocus = () => {
    Animated.timing(searchIconAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(cancelIconOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowCancelIcon(true);

  };

  const handleInputBlur = () => {
    if (!courseName) {
      Animated.timing(searchIconAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(cancelIconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowCancelIcon(false));
    }
  };

  return (
    <View style={Styles.container} >
      <BackOptionHeader
        onPressBack={() => { }}
        onPressOption={toggleModal}
      />

      <View style={styles.topContainer}>
        <View style={styles.folderNameContainer}>
          <LocationIcon width={getSize(17)} height={getSize(24)} />
          <View style={styles.folderNameWrapper}>
            <Text style={styles.folderNameText}>{folderName}</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: searchIconAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, (width - getSize(Sizes.formMargin) * 2) - 60],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              style={styles.searchIcon}
              disabled={!showCancelIcon}
            >
              <SearchIcon width={getSize(24)} height={getSize(24)} />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            onPress={() => { }}
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              height: getSize(56),
            }}>
            <TextInput
              style={styles.searchInput}
              placeholder={showCancelIcon ? "코스 이름, 지역" : ''}
              placeholderTextColor={Colors.placeholder}
              value={courseName}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChangeText={setCourseName}
            />
          </TouchableOpacity>

          {showCancelIcon && (
            <Animated.View style={[
              styles.cancelIcon,
              { opacity: cancelIconOpacity }
            ]}>
              <TouchableOpacity
                onPress={() => setCourseName('')}
              >
                <CancelIcon width={getSize(24)} height={getSize(24)} />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.courseListContainer}>
        {courseList.map((course, index) => (
          <View key={course.id} style={styles.courseWrapper}>
            <CourseBox
              key={index}
              title={course.title}
              time={course.time}
              distance={course.distance}
              img={""}
              onPressSave={() => console.log("Save course:", course.title)}
              onPressButton={() => console.log("Start course:", course.title)}
            />
          </View>
        ))}
      </ScrollView>

      {/* 옵션 */}
      <Modal
        transparent={true}
        visible={visibleModal}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleModal} // Close modal if clicking outside the menu
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => console.log('Edit course')}>
              <Text style={styles.menuItem}>코스 이름 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Delete course')}>
              <Text style={styles.menuItem}>코스 삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Delete folder')}>
              <Text style={styles.menuItem}>폴더 삭제</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: getSize(105),
    marginTop: getSize(27),
    paddingHorizontal: getSize(Sizes.formMargin),
    marginBottom: getSize(20),
  },
  folderNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(10),
    gap: getSize(7),
  },
  folderNameWrapper: {
    height: getSize(29),
  },
  folderNameText: {
    color: 'white',
    fontSize: getSize(24),
    fontFamily: Fonts.bold,
  },
  searchBar: {
    backgroundColor: Colors.grayBox,
    width: '100%',
    height: getSize(56),
    justifyContent: 'center',
    paddingHorizontal: getSize(20),
    marginTop: getSize(20),
    borderRadius: 10,
  },
  searchInput: {
    color: 'white',
    fontSize: getSize(18),
    width: getSize(310),
    // backgroundColor: 'white',
  },
  searchIcon: {
    position: 'absolute',
    top: getSize(16),
    width: getSize(24),
    height: getSize(24),
  },
  cancelIcon: {
    position: 'absolute',
    right: getSize(58),
  },
  courseListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width,
    paddingBottom: getSize(18),
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  courseWrapper: {
    width: getSize(172),
    marginBottom: getSize(20),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    padding: getSize(10),
    width: getSize(225),
  },
  menuItem: {
    color: 'white',
    paddingVertical: getSize(10),
    fontSize: getSize(16),
  },
})

export default MyCourseScreen;