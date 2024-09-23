import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Styles from "@/constants/Styles";
import { MainGradient } from "@/components/Gradient";
import { MyFolderHeader } from "@/components/header/IconHeader";
import getSize from "@/scripts/getSize";
import { CourseFeedScreenNavigationProp } from "@/scripts/navigation";
import { FolderContainer } from "@/components/FolderContainer";

const { width } = Dimensions.get('window');

type Mode = 'BASIC' | 'EDIT' | 'DELETE';

const CourseFeedFolderScreen = () => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  const folderList = [
    { name: '서천동', id: 1 },
    { name: '봉천동', id: 2 },
    { name: '대학로', id: 3 },
    { name: '홍대입구', id: 4 },
    { name: '망포동', id: 5 },
    { name: '예술동', id: 6 },
    { name: '최애 코스', id: 7 },
    { name: '화이팅', id: 8 },
  ];

  const [mode, setMode] = useState<Mode>('BASIC');
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);

  const handleFolderPress = (folderId: number) => {
    if (mode === 'BASIC') {
      navigation.navigate('course-feed/my/course', { folderId });
    } else {
      setSelectedFolders(prevSelected => {
        if (prevSelected.includes(folderId)) {
          return prevSelected.filter(id => id !== folderId);
        } else {
          return [...prevSelected, folderId];
        }
      });
    }
  };

  const handleDelete = () => {
    console.log('Deleting folders:', selectedFolders);
    // to do : delete api 연결
  };

  const handleEdit = () => {
    console.log('Editing folders:', selectedFolders);
    // to do : edit api 연결
  };

  return (
    <View style={Styles.container}>
      <MainGradient />
      <MyFolderHeader
        onPressBack={() => { navigation.goBack() }}
        onPressSearch={() => { navigation.navigate('course-feed/my/folderSearch'); }}
        onPressOption={() => { }}
      />

      <View style={{ marginTop: getSize(34) }} />

      <FolderContainer
        folderList={folderList}
        selectedFolders={selectedFolders}
        onFolderPress={handleFolderPress}
        mode={mode}
      />

    </View>
  );
}

const styles = StyleSheet.create({
})

export default CourseFeedFolderScreen;