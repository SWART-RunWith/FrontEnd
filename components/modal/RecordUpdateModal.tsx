import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RNModal from 'react-native-modal';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import {
  ModalHeader,
  ModalInput,
  ModalProps,
} from '@/components/modal/UpdateModal';

const { width } = Dimensions.get('window');

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
});

export {
  DistanceUpdateModal,
  PaceUpdateModal,
  TimeUpdateModal,
};
