import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import CancelIcon from '@/assets/icons/cancel.svg';

const { width } = Dimensions.get('window');

interface ModalProps {
  isVisible?: boolean;
  onCancel?: () => void;
  onConfirm?: (newValue: string) => void;
  value?: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
}

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

const ModalInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}> = ({
  label,
  value,
  onChangeText,
  placeholder
}) => (
    <View style={styles.modalInputContainer}>
      <View style={styles.inputHeader}>
        <Text style={styles.modalInputTitle}>{label}</Text>
        <TouchableOpacity
          style={{
            marginTop: getSize(11),
            marginRight: getSize(10),
          }}
          onPress={() => onChangeText('')}>
          <CancelIcon width={getSize(20)} height={getSize(20)} fill={Colors.gray} />
        </TouchableOpacity>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.modalInput}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        multiline={true}
        maxLength={200}
      />
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
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalInputContainer: {
    paddingLeft: getSize(18),
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(140),
    marginTop: getSize(24),
    borderColor: 'white',
    borderWidth: getSize(1),
    borderRadius: 20,
  },
  modalInputTitle: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
    marginTop: getSize(18),
  },
  modalInput: {
    marginRight: getSize(55),
    marginBottom: getSize(25),
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Light',
    marginTop: getSize(10),
  },
})

export {
  ModalProps,
  ModalHeader,
  ModalInput,
}