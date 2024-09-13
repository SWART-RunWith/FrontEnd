import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RNModal from 'react-native-modal';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import { ModalHeader } from '@/components/modal/UpdateModal';

const { width } = Dimensions.get('window');

interface ShoesUpdateModalProps {
  isVisible?: boolean;
  onCancel?: () => void;
  onConfirm?: (newValue: string) => void;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
}

const ShoesUpdateModal: React.FC<ShoesUpdateModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  value,
  label,
  placeholder,
  onChangeText
}) => {
  const [tempValue, setTempValue] = useState(value);

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      style={styles.bottomModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ModalHeader
              title="신발 정보 수정"
              onCancel={onCancel}
              onConfirm={() => onConfirm && onConfirm(tempValue || '')}
            />

            <View style={styles.modalInputContainer}>
              <View style={styles.inputHeader}>
                <Text style={styles.modalInputTitle}>{label}</Text>
              </View>
              <TextInput
                value={tempValue}
                onChangeText={(text) => {
                  setTempValue(text);
                  onChangeText(text);
                }}
                style={styles.modalInput}
                placeholder={placeholder}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                multiline={true}
                maxLength={200}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.grayBox,
    width: width,
    height: getSize(800),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
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
  modalInputContainer: {
    paddingLeft: getSize(18),
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(140),
    marginTop: getSize(24),
    borderColor: 'white',
    borderWidth: getSize(1),
    borderRadius: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export { ShoesUpdateModal };
