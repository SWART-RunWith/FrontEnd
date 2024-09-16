import React from "react";
import ActionModal from "@/components/modal/pop-up/PopUpModal"

interface CourseModalProps {
  modalVisible: boolean;
  isLeftMain: boolean;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

const CourseSaveModal: React.FC<CourseModalProps> = ({
  modalVisible = false,
  isLeftMain,
  onLeftButtonPress,
  onRightButtonPress
}) => {
  return (
    <ActionModal
      visible={modalVisible}
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
  modalVisible = false,
  isLeftMain,
  onLeftButtonPress,
  onRightButtonPress
}) => {
  return (
    <CourseSaveModal
      modalVisible={modalVisible}
      isLeftMain={isLeftMain}
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}
    />
  );
};