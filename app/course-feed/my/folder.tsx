import { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FolderEditIcon from '@/assets/icons/folderEdit.svg';
import FolderDeleteIcon from '@/assets/icons/folderDelete.svg';
import Colors from "@/constants/Colors";
import Styles from "@/constants/Styles";
import { MainGradient } from "@/components/Gradient";
import { MyFolderHeader } from "@/components/header/IconHeader";
import getSize from "@/scripts/getSize";
import { CourseFeedScreenNavigationProp } from "@/scripts/navigation";
import { FolderContainer } from "@/components/FolderContainer";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import { FolderNameEditModal } from "@/components/modal/pop-up/FolderModal";

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
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<{ id: number, name: string } | null>(null);

  const toggleModal = () => setVisibleModal(!visibleModal);

  const handleFolderPress = (folderId: number) => {
    switch (mode) {
      case 'BASIC':
        navigation.navigate('course-feed/my/course', { folderId });
        break;

      case 'EDIT':
        if (selectedFolders.includes(folderId)) {
          setSelectedFolders([]);
        } else {
          const folder = folderList.find(f => f.id === folderId);
          if (folder) {
            setSelectedFolder(folder);
            setSelectedFolders([folderId]);
            setVisibleEditModal(true);
          }
        }
        break;

      case 'DELETE':
        setSelectedFolders(prevSelected => {
          if (prevSelected.includes(folderId)) {
            return prevSelected.filter(id => id !== folderId);
          } else {
            return [...prevSelected, folderId];
          }
        });
        break;

      default:
        break;
    }
  };

  const handleDelete = () => {
    console.log('Deleting folders:', selectedFolders);
    // to do : delete api 연결
  };

  const handleEdit = () => {
    console.log('Editing folders:', selectedFolder);
    // to do : edit api 연결
  };

  return (
    <View style={Styles.container}>
      <MainGradient />
      <MyFolderHeader
        onPressBack={() => { navigation.goBack() }}
        onPressSearch={() => { navigation.navigate('course-feed/my/folderSearch'); }}
        onPressOption={() => { setVisibleModal(true) }}
      />

      <View style={{ marginTop: getSize(34) }} />

      <FolderContainer
        folderList={folderList}
        selectedFolders={selectedFolders}
        onFolderPress={handleFolderPress}
        mode={mode}
      />

      {/* 옵션 */}
      <Modal
        transparent={true}
        visible={visibleModal}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleModal}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMode('EDIT');
                setVisibleEditModal(true);
                setVisibleModal(false);
              }}>
              <Text style={styles.menuText}>코스 이름 수정</Text>
              <FolderEditIcon />
            </TouchableOpacity>
            <View style={styles.bar}></View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMode('DELETE');
                setVisibleModal(false);
              }}>
              <Text style={styles.menuText}>코스 삭제</Text>
              <FolderDeleteIcon />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {selectedFolder && (
        <FolderNameEditModal
          visible={visibleEditModal}
          onClose={() => setVisibleEditModal(false)}
          folderId={selectedFolder.id}
          folderName={selectedFolder.name}
          onUpdate={handleEdit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: Colors.grayBox,
    marginTop: getSize(70),
    marginRight: Sizes.formMargin,
    borderRadius: 10,
    width: getSize(225),
    height: getSize(112),
  },
  menuItem: {
    paddingLeft: getSize(12),
    paddingRight: getSize(14),
    paddingVertical: getSize(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: getSize(56),
  },
  menuText: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.medium,
  },
  bar: {
    backgroundColor: Colors.lightestGray,
    width: '100%',
    height: getSize(1),
  }
})

export default CourseFeedFolderScreen;