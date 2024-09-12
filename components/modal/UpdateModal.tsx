import { Dimensions, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";

const { width } = Dimensions.get('window');

const ModalHeader: React.FC<{
  title: string;
  onCancel?: () => void;
  onConfirm?: () => void
}> = ({
  title,
  onCancel,
  onConfirm,
}) => (
    <View style={styles.modalTitleContainer}>
      <Text style={styles.modalCancel} onPress={onCancel}>
        취소
      </Text>
      <Text style={styles.modalTitle}>{title}</Text>
      <Text style={styles.modalConfirm} onPress={onConfirm}>
        완료
      </Text>
    </View>
  );

const styles = StyleSheet.create({
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: getSize(29),
    paddingHorizontal: getSize(24),
    marginTop: getSize(13),
  },
  modalCancel: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },
  modalTitle: {
    fontSize: getSize(Sizes.pageTitle),
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },
  modalConfirm: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-SemiBold',
    color: Colors.main,
  },
})

export {
  ModalHeader,
}