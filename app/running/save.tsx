import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CourseSaveHeader } from "@/components/header/IconHeader";
import Styles from '@/constants/Styles';
import getSize from "@/scripts/getSize";
import { CourseFeedScreenNavigationProp } from "@/scripts/navigation";
import Sizes from "@/constants/Sizes";
import { CourseSaveFolderButton } from "@/components/button/FolderButton";
import { CourseAddModal } from "@/components/modal/pop-up/CourseModal";

const { width } = Dimensions.get('window');

const CourseSaveScreen = () => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [courseName, setCourseName] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // to do : 모든 폴더 데이터 가져오기 api 연동 -> list로 받기
  const folderList = [
    { name: '서천동', id: 1 },
    { name: '봉천동', id: 2 },
    { name: '대학로', id: 3 },
    { name: '홍대입구', id: 4 },
    { name: '강남', id: 5 },
    { name: '이태원', id: 6 },
  ];

  const handleSelectFolder = (folderId: number) => {
    setSelectedFolder(prevSelected =>
      prevSelected === folderId ? null : folderId
    );
    setVisibleModal(true);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
    setCourseName('');
    setSelectedFolder(null);
  }

  const saveCourse = async () => {
    const uri = 'localhost:8080/test/api'

    console.log('api uri : ' + uri);
    console.log('course name : ' + courseName);
    console.log('selected folder id : ', selectedFolder);
    setCourseName('');
    handleCloseModal();
    setIsSaved(true);

    if (!uri) {
      console.log('URI가 정의되지 않았습니다.');
      return;
    }

    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName }),
      });

      if (response.ok) {
        console.log('코스가 성공적으로 저장되었습니다.');
      } else {
        console.log('저장 중 오류 발생');
      }
    } catch (error) {
      console.log('API 호출 중 오류 발생', error);
    }
  };

  useEffect(() => {
    if (isSaved) {
      setIsSaved(false);
      navigation.navigate('course-feed/my/course', {
        folderId: selectedFolder ?? 0,
      });
    }
  }, [isSaved]);

  return (
    <View style={Styles.container}>
      <CourseSaveHeader
        onPressBack={() => { navigation.goBack() }}
        onPressSearch={() => { console.log('search') }}
      />

      <View style={styles.textContainer}>
        <Text style={styles.notice}>저장하실 폴더를 선택해주세요</Text>
      </View>

      {/* 폴더 리스트 */}
      <View style={styles.foldersContainer}>
        {folderList.map((folder) => (
          <View key={folder.id} style={styles.folderWrapper}>
            <CourseSaveFolderButton
              name={folder.name}
              isSelected={selectedFolder === folder.id}
              count={0}
              onPress={() => handleSelectFolder(folder.id)}
            />
          </View>
        ))}
      </View>

      <CourseAddModal
        visible={visibleModal}
        isLeftMain={false}
        value={courseName}
        onChangeText={setCourseName}
        onLeftButtonPress={handleCloseModal}
        onRightButtonPress={saveCourse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: width,
    height: getSize(24),
    marginTop: getSize(52),
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  notice: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },
  foldersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: getSize(44),
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  folderWrapper: {
    width: (width - getSize(Sizes.formMargin) * 2) / 2 - getSize(8),
    marginBottom: getSize(22),
  },
});

export default CourseSaveScreen;
