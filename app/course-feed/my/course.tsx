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
import { useNavigation, useRoute } from "@react-navigation/native";

import LocationIcon from '@/assets/icons/location.svg';
import SearchIcon from '@/assets/icons/search.svg';
import CancelIcon from '@/assets/icons/cancel.svg';
import FolderEditIcon from '@/assets/icons/folderEdit.svg';
import FolderDeleteIcon from '@/assets/icons/folderDelete.svg';
import CourseDeleteIcon from '@/assets/icons/courseDelete.svg';
import { BackOptionHeader } from "@/components/header/IconHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import Styles from "@/constants/Styles";
import getSize from "@/scripts/getSize";
import {
  CourseFeedScreenNavigationProp,
  CourseSaveScreenRouteProp
} from "@/scripts/navigation";
import { CourseBox } from "@/components/box/CourseFeed";
import { CourseContainer } from "@/components/container/CourseContainer";
import { CourseNameEditModal } from "@/components/modal/pop-up/CourseModal";

type Mode = 'BASIC' | 'EDIT' | 'DELETE';

const { width } = Dimensions.get('window');

const MyCourseScreen = () => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();
  const route = useRoute<CourseSaveScreenRouteProp>();
  const { folderId } = route.params;

  // dummy data
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

  // search
  const [courseName, setCourseName] = useState('');
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

  // 수정 & 삭제
  const [mode, setMode] = useState<Mode>('BASIC');
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCourseDeleteModal, setVisibleCourseDeleteModal] = useState(false);
  const [visibleFolderDeleteModal, setVisibleFolderDeleteModal] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<{ id: number, title: string } | null>(null);

  useEffect(() => { }, [mode])

  const toggleModal = () => setVisibleModal(!visibleModal);

  const handleCoursePress = (courseId: number) => {
    switch (mode) {
      case 'BASIC':
        // navi 연결
        break;

      case 'EDIT':
        if (selectedCourses.includes(courseId)) {
          setSelectedCourses([]);
        } else {
          const course = courseList.find(c => c.id === courseId);
          if (course) {
            setSelectedCourse(course);
            setSelectedCourses([courseId]);
            setVisibleEditModal(true);
          }
        }
        break;

      case 'DELETE':
        setSelectedCourses(prevSelected => {
          if (prevSelected.includes(courseId)) {
            return prevSelected.filter(id => id !== courseId);
          } else {
            return [...prevSelected, courseId];
          }
        });
        break;

      default:
        break;
    }
  };

  const handleCourseEdit = () => {
    setMode('EDIT');
    setVisibleModal(false);
    console.log('edit course : ', mode);
  }

  const handleCourseDelete = () => {
    setMode('DELETE');
    setVisibleModal(false);
    console.log('delete courses: ', mode)
  }

  const handleFolderDelete = () => {
    // to do : folder 삭제 api 연동
    setVisibleModal(false);
    console.log('delete folder : ', mode);

  }

  return (
    <View style={Styles.container} >
      <BackOptionHeader
        onPressBack={() => { navigation.goBack() }}
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
                    outputRange: [0, (width - getSize(Sizes.formMargin) * 2) - getSize(60)],
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
        <CourseContainer
          courseList={courseList}
          selectedCourses={selectedCourses}
          onFolderPress={handleCoursePress}
        />
      </ScrollView>

      {/* 옵션 */}
      <Modal
        transparent={true}
        visible={visibleModal}
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
              onPress={handleCourseEdit}
            >
              <Text style={styles.menuText}>코스 이름 수정</Text>
              <FolderEditIcon width={getSize(16)} height={getSize(14)} />
            </TouchableOpacity>
            <View style={styles.bar} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleCourseDelete}
            >
              <Text style={styles.menuText}>코스 삭제</Text>
              <CourseDeleteIcon width={getSize(13)} height={getSize(16)} />
            </TouchableOpacity>
            <View style={styles.bar} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleFolderDelete}
            >
              <Text style={styles.menuText}>폴더 삭제</Text>
              <FolderDeleteIcon width={getSize(16)} height={getSize(14)} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {selectedCourse &&
        <CourseNameEditModal
          visible={visibleEditModal}
          folderId={folderId}
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
          onUpdate={handleCourseEdit}
          onClose={() => {
            setVisibleEditModal(false);
            setSelectedCourse(null);
          }}
        />
      }
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
    width: width,
  },
  modalOverlay: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    width: getSize(225),
    height: getSize(168),
    top: getSize(98),
    right: getSize(Sizes.formMargin),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getSize(14),
    alignItems: 'center',
    height: getSize(56),
    width: '100%',
  },
  menuText: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.medium,
    marginLeft: getSize(-2),
  },
  bar: {
    backgroundColor: Colors.lightestGray,
    height: getSize(1),
    width: '100%',
  }
})

export default MyCourseScreen;