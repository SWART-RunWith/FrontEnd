import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

// Interface for the common modal props
interface ModalProps {
  isVisible?: boolean;
  onCancel?: () => void;
  onConfirm?: (newValue: string) => void;
  value?: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
}

// Modal input component
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
      <Text style={styles.modalInputTitle}>{label}</Text>
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

// General RecordUpdateModal component that other modals will use
const RecordUpdateModal: React.FC<ModalProps & { title: string }> = ({
  isVisible,
  onCancel,
  onConfirm,
  value,
  onChangeText,
  label,
  placeholder,
  title,
}) => (
  <RNModal
    isVisible={isVisible}
    onBackdropPress={onCancel}
    style={styles.bottomModal}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader
            title={title}
            onCancel={onCancel}
            onConfirm={() => {
              if (onConfirm && value) {
                onConfirm(value);
              }
            }}
          />
          <ModalInput
            label={label || ''}
            value={value || ''}
            onChangeText={onChangeText}
            placeholder={placeholder || ''}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </RNModal>
);

const DistanceUpdateModal: React.FC<ModalProps> = (
  props
) => (
  <RecordUpdateModal
    {...props}
    title="최장 거리 수정"
    label="거리"
    placeholder="최장 거리를 입력해주세요"
  />
);

const TimeUpdateModal: React.FC<ModalProps> = (
  props
) => (
  <RecordUpdateModal
    {...props}
    title="최장 시간 수정"
    label="시간"
    placeholder="최장 시간을 입력해주세요"
  />
);

const PaceUpdateModal: React.FC<ModalProps> = (
  props
) => (
  <RecordUpdateModal
    {...props}
    title="최고 페이스 수정"
    label="페이스"
    placeholder="최고 페이스를 입력해주세요"
  />
);

// Styles
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

export { DistanceUpdateModal, PaceUpdateModal, TimeUpdateModal };
