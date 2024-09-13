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
  ModalRecordInput,
} from '@/components/modal/UpdateModal';

const { width } = Dimensions.get('window');


interface ModalProps {
  label: string;
  placeholder: string;
  title: string;
}

interface UpdateValueProps {
  isVisible?: boolean;
  value?: string;
  shoesValue?: string;
  memoValue?: string;
  onChangeText: (text: string) => void;
  onChangeShoes: (text: string) => void;
  onChangeMemo: (text: string) => void;
  onCancel?: () => void;
  onConfirm?: (
    newValue: string,
    newShoes: string,
    newMemo: string
  ) => void;
}

const RecordUpdateModal: React.FC<ModalProps & UpdateValueProps> = ({
  isVisible,
  value = '',
  shoesValue = '',
  memoValue = '',
  onChangeText,
  onChangeShoes,
  onChangeMemo,
  onCancel,
  onConfirm,
  label = '',
  placeholder = '값을 입력해주세요',
  title = '수정',
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
              if (onConfirm) {
                onConfirm(
                  value === '' ? '' : value,
                  shoesValue === '' ? '' : shoesValue,
                  memoValue === '' ? '' : memoValue
                );
              }
            }}
          />

          <View style={styles.modalInputContainer}>
            <ModalRecordInput
              label={label}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
            />
            <ModalRecordInput
              label='신발 정보'
              value={shoesValue}
              onChangeText={onChangeShoes}
              placeholder='신발 정보를 입력해주세요'
            />
            <ModalRecordInput
              label='메모'
              value={memoValue}
              onChangeText={onChangeMemo}
              placeholder='메모를 입력해주세요'
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </RNModal>
);

const DistanceUpdateModal: React.FC<UpdateValueProps> = (props) => (
  <RecordUpdateModal
    {...props}
    title="최장 거리 수정"
    label="KM"
    placeholder="최장 거리를 입력해주세요"
  />
);

const TimeUpdateModal: React.FC<UpdateValueProps> = (props) => (
  <RecordUpdateModal
    {...props}
    title="최장 시간 수정"
    label="TIME"
    placeholder="최장 시간을 입력해주세요"
  />
);

const PaceUpdateModal: React.FC<UpdateValueProps> = (props) => (
  <RecordUpdateModal
    {...props}
    title="최고 페이스 수정"
    label="TIME"
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
  modalInputContainer: {
    marginTop: getSize(48),
    gap: getSize(12),
  }
});

export {
  DistanceUpdateModal,
  PaceUpdateModal,
  TimeUpdateModal,
};
