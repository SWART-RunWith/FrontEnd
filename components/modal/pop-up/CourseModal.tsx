import React, { useState } from "react";
import { Alert } from "react-native";

import {
  ActionModal,
  EditModal
} from "@/components/modal/pop-up/PopUpModal"

interface CourseModalProps {
  visible: boolean;
  isLeftMain: boolean;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

const CourseSaveModal: React.FC<CourseModalProps> = ({
  visible = false,
  isLeftMain,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  return (
    <ActionModal
      visible={visible}
      isLeftMain={isLeftMain}
      type="코스"
      description="저장히지 않은 코스는 삭제됩니다."
      isSave={true}
      leftButtonText='아니요'
      rightButtonText='저장하기'
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}
    />
  );
};

export const MyCourseSaveModal: React.FC<CourseModalProps> = ({
  visible = false,
  isLeftMain,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  return (
    <CourseSaveModal
      visible={visible}
      isLeftMain={isLeftMain}
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}
    />
  );
};

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const CourseAddModal: React.FC<CourseModalProps & TextInputProps> = ({
  visible = false,
  isLeftMain,
  value = '',
  onChangeText,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  return (
    <EditModal
      visible={visible}
      isLeftMain={isLeftMain}
      title="코스 추가"
      value={value}
      onChangeText={onChangeText}
      leftButtonText="취소하기"
      rightButtonText="저장하기"
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}
    />
  )
};

interface CourseUpdateModalProp {
  visible: boolean;
  onClose: () => void;
  folderId: number;
  courseId: number;
  courseTitle: string;
  onUpdate: (updateCourse: {
    folderId: number,
    courseId: number;
    title: string
  }) => void;
}

export const CourseNameEditModal: React.FC<CourseUpdateModalProp> = ({
  visible = false,
  onClose,
  folderId,
  courseId,
  courseTitle,
  onUpdate,
}) => {
  const [newTitle, setNewTitle] = useState(courseTitle);

  const updateCourseNameAPI = async (
    folderId: number,
    courseId: number,
    title: string
  ) => {
    try {
      const response = await fetch(`https://api.example.com/folder/${folderId}/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      if (response.ok) {
        const updatedCourse = await response.json();
        onUpdate(updatedCourse);
        onClose();
      } else {
        throw new Error("코스 이름 업데이트 실패");
      }
    } catch (error) {
      Alert.alert("오류", "코스 이름을 업데이트할 수 없습니다.");
      console.error(error);
    }
  };

  const handleUpdate = () => {
    updateCourseNameAPI(folderId, courseId, newTitle);
  };

  return (
    <EditModal
      visible={visible}
      isLeftMain={false}
      title="폴더 이름 변경"
      value={newTitle}
      onChangeText={setNewTitle}
      leftButtonText="취소하기"
      rightButtonText="저장하기"
      onLeftButtonPress={onClose}
      onRightButtonPress={handleUpdate}
    />
  );
};