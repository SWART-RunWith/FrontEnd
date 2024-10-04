import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import FolderEditIcon from '@/assets/icons/folderEdit.svg';
import FolderDeleteIcon from '@/assets/icons/folderDelete.svg';
import Colors from "@/constants/Colors";
import Styles from "@/constants/Styles";
import { MainGradient } from "@/components/Gradient";
import { MyFolderHeader } from "@/components/header/IconHeader";
import getSize from "@/scripts/getSize";
import { CourseFeedMineScreenNavigationProp, CourseFolderScreenRouteProp } from "@/scripts/navigation";
import { FolderContainer } from "@/components/container/FolderContainer";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import { FolderDeleteModal, FolderNameEditModal } from "@/components/modal/pop-up/FolderModal";
import BottomTab from "@/components/BottomTab";
import axios from "axios";

const { width } = Dimensions.get('window');

type Mode = 'BASIC' | 'EDIT' | 'DELETE';

interface Folder {
  name: string;
  id: number;
}

const CourseFeedFolderScreen = () => {
  const route = useRoute<CourseFolderScreenRouteProp>();
  const navigation = useNavigation<CourseFeedMineScreenNavigationProp>();

  const [folderList, setFolderList] = useState<Folder[]>(route.params?.folderList || []);

  const [mode, setMode] = useState<Mode>('BASIC');
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<{ id: number, name: string } | null>(null);

  const toggleModal = () => setVisibleModal(!visibleModal);

  const handleFolderPress = (folderId: number, folderName: string) => {
    switch (mode) {
      case 'BASIC':
        navigation.navigate('course-feed/my/course', { folderId, folderName });
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
        onPressSearch={() => { navigation.navigate('course-feed/my/folderSearch', { folderList }); }}
        onPressOption={() => { setVisibleModal(true) }}
      />

      <View style={{ marginTop: getSize(34) }} />

      <FolderContainer
        folderList={folderList}
        selectedFolders={selectedFolders}
        onFolderPress={handleFolderPress}
      />

      {mode === 'DELETE' &&
        <View style={styles.selectBar}>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => {
              setMode('BASIC')
              setSelectedFolders([]);
            }}
          >
            <Text style={styles.sideText}>취소</Text>
          </TouchableOpacity>
          <Text style={styles.middleText}>{selectedFolders.length}개의 폴더가 선택됨</Text>
          <TouchableOpacity
            style={[styles.sideButton, { alignItems: 'flex-end' }]}
            onPress={() => { setVisibleDeleteModal(true) }}
          >
            <Text style={styles.sideText}>전체 삭제</Text>
          </TouchableOpacity>
        </View>}

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
          onClose={() => {
            setVisibleEditModal(false);
            setSelectedFolder(null);
            setSelectedFolders([]);
          }}
          folderId={selectedFolder.id}
          folderName={selectedFolder.name}
          onUpdate={handleEdit}
        />
      )}

      <FolderDeleteModal
        visible={visibleDeleteModal}
        onCancel={() => setVisibleDeleteModal(false)}
        onDelete={() => {
          console.log('folder 삭제')
          handleDelete();
          setVisibleDeleteModal(false);
        }}
      />

      <BottomTab route='CourseFeed' />
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
  },
  selectBar: {
    backgroundColor: Colors.navigator,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    paddingHorizontal: getSize(Sizes.formMargin),
    height: getSize(90),
    width: width,
  },
  sideButton: {
    justifyContent: 'center',
    width: getSize(90),
    height: getSize(90),
  },
  sideText: {
    color: Colors.main,
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
  },
  middleText: {
    color: 'white',
    fontSize: getSize(18),
    fontFamily: Fonts.bold,
  }
})

export default CourseFeedFolderScreen;