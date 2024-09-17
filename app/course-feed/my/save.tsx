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
import { useState } from "react";
import { EditModal } from "@/components/modal/pop-up/PopUpModal";

const { width } = Dimensions.get('window');

const CourseSaveScreen = () => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [visibleModal, setVisibleModal] = useState(false);

  // to do : 모든 폴더 데이터 가져오기 api 연동 -> list로 받기
  const folderList = [
    { name: '서천동', id: '1' },
    { name: '봉천동', id: '2' },
    { name: '대학로', id: '3' },
    { name: '홍대입구', id: '4' },
    { name: '강남', id: '5' },
    { name: '이태원', id: '6' },
  ];

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolder(prevSelected =>
      prevSelected === folderId ? null : folderId
    );
    setVisibleModal(true);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  }

  return (
    <View style={Styles.container}>
      <CourseSaveHeader
        onPressBack={() => { navigation.goBack() }}
        onPressSearch={() => { console.log('search') }}
      />

      <View style={styles.textContainer}>
        <Text style={styles.notice}>저장하실 폴더를 선택해주세요</Text>
      </View>

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

      <EditModal
        visible={visibleModal}
        isLeftMain={true}
        isSave={false}
        leftButtonText='삭제하기'
        rightButtonText='아니요'
        onLeftButtonPress={handleCloseModal}
        onRightButtonPress={() => { }}
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
