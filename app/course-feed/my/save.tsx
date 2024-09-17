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
import { FolderButton } from "@/components/button/FolderButton";
import { useState } from "react";

const { width } = Dimensions.get('window');

const CourseSaveScreen = () => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

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
    setSelectedFolders(prevSelected =>
      prevSelected.includes(folderId)
        ? prevSelected.filter(id => id !== folderId)
        : [...prevSelected, folderId]
    );
  };

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
            <FolderButton
              name={folder.name}
              isSelected={selectedFolders.includes(folder.id)}
              showNum={false}
              count={0}
              onPress={() => handleSelectFolder(folder.id)}
            />
          </View>
        ))}
      </View>
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

  },
  folderWrapper: {

  },
});

export default CourseSaveScreen;