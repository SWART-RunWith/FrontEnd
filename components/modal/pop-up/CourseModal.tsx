import React from "react";
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
  onRightButtonPress
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
  onRightButtonPress
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

export const CourseAddModal: React.FC<CourseModalProps> = ({
  visible = false,
  isLeftMain,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  return (
    <EditModal
      visible={visible}
      isLeftMain={isLeftMain}
      leftButtonText='취소하기'
      rightButtonText='저장하기'
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}
    />
  )
}