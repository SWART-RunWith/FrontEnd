import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import getSize from "@/scripts/getSize";

interface FolderUpdateModalProp {
  visible: boolean;
  onClose: () => void;
  folderId: number;
  folderName: string;
  onUpdate: (updatedFolder: { id: number; name: string }) => void;
}

export const FolderNameEditModal: React.FC<FolderUpdateModalProp> = ({
  visible = false,
  onClose,
  folderId,
  folderName,
  onUpdate,
}) => {
  const [newName, setNewName] = useState(folderName);

  // 폴더 이름 업데이트 API 호출 함수
  const updateFolderNameAPI = async (id: number, name: string) => {
    try {
      const response = await fetch(`https://api.example.com/folder/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (response.ok) {
        const updatedFolder = await response.json();
        onUpdate(updatedFolder); // 업데이트된 폴더 데이터를 상위로 전달
        onClose();
      } else {
        throw new Error("폴더 이름 업데이트 실패");
      }
    } catch (error) {
      Alert.alert("오류", "폴더 이름을 업데이트할 수 없습니다.");
      console.error(error);
    }
  };

  const handleUpdate = () => {
    // 폴더 이름을 업데이트하는 API 호출
    updateFolderNameAPI(folderId, newName);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleText}>폴더 이름 수정</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity onPress={() => setNewName(folderName)}>
              <Text style={styles.cancelIcon}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>수정하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: Colors.grayBox,
    borderRadius: getSize(10),
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(30),
    width: "80%",
    alignItems: "center",
  },
  titleText: {
    fontSize: getSize(18),
    fontFamily: Fonts.bold,
    color: Colors.main,
    marginBottom: getSize(20),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getSize(20),
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayBox,
  },
  input: {
    flex: 1,
    fontSize: getSize(16),
    fontFamily: Fonts.medium,
    color: Colors.main,
    paddingVertical: getSize(10),
  },
  cancelIcon: {
    fontSize: getSize(20),
    color: Colors.placeholder,
    paddingHorizontal: getSize(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: getSize(20),
  },
  cancelButton: {
    backgroundColor: Colors.lightGrayBox,
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(20),
    borderRadius: getSize(8),
  },
  updateButton: {
    backgroundColor: Colors.main,
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(20),
    borderRadius: getSize(8),
  },
  buttonText: {
    fontSize: getSize(16),
    fontFamily: Fonts.bold,
    color: "white",
  },
});
