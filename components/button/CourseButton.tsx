import { DefaultButton } from "./Button";

interface CourseButtonProps {
  onPress: () => void;
}

export const CourseRunButton: React.FC<CourseButtonProps> = ({
  onPress,
}) => {
  return (
    <DefaultButton
      text="코스 뛰기"
      onPress={onPress}
    />
  );
};