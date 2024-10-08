import React, { useState } from "react";
import {
  Alert,
} from "react-native";

import {
  ActionModal,
  EditModal
} from "@/components/modal/pop-up/PopUpModal";

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
    updateFolderNameAPI(folderId, newName);
  };

  return (
    <EditModal
      visible={visible}
      isLeftMain={false}
      title="폴더 이름 수정"
      value={newName}
      onChangeText={setNewName}
      leftButtonText="아니요"
      rightButtonText="수정하기"
      onLeftButtonPress={onClose}
      onRightButtonPress={handleUpdate}
    />
  );
};


interface FolderDeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export const FolderDeleteModal: React.FC<FolderDeleteModalProps> = ({
  visible = false,
  onCancel,
  onDelete,
}) => {
  return (
    <ActionModal
      visible={visible}
      type="폴더"
      description={'삭제하신 폴더는 다시 복구 되지 않습니다.'}
      isSave={false}
      isLeftMain={false}
      leftButtonText="삭제하기"
      rightButtonText="아니요"
      onLeftButtonPress={onDelete}
      onRightButtonPress={onCancel}
    />
  );
};