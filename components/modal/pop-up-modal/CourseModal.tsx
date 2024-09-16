import React from "react";
import ActionModal from "@/components/modal/pop-up-modal/PopUpModal"

interface CourseModalProps {
  modalVisible?: boolean;
  description?: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

const CourseSaveModal: React.FC<CourseModalProps> = ({
  modalVisible = false,
  onLeftButtonPress,
  onRightButtonPress
}) => {
  return (
    <ActionModal
      visible={modalVisible}
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
  onLeftButtonPress,
  onRightButtonPress
}) => {
  return (
    <CourseSaveModal
      modalVisible={modalVisible}
      onLeftButtonPress={onLeftButtonPress}
      onRightButtonPress={onRightButtonPress}
    />
  );
};