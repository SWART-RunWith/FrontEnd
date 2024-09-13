import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import RNModal from 'react-native-modal';

import {
  ModalHeader,
  ModalRecordInput,
} from '@/components/modal/UpdateModal';
import { TimerModal } from '@/components/modal/TimerModal';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import CancelIcon from '@/assets/icons/cancel.svg';

const { width } = Dimensions.get('window');

interface ModalProps {
  label: string;
  title: string;
  type: 'distance' | 'pace' | 'time';
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
  title = '수정',
  type = 'distance',
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = (selected: string) => {
    setSelectedValue(selected);
    setModalVisible(false);
    onChangeText(selected);
  };

  return (
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
                    value === '' ? '0' : value,
                    shoesValue === '' ? '' : shoesValue,
                    memoValue === '' ? '' : memoValue
                  );
                }
              }}
            />

            <View style={styles.modalInputContainers}>
              <TouchableWithoutFeedback
                onPress={() => showModal()}>
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
                  <Text style={styles.modalInput}>{value}</Text>
                </View>
              </TouchableWithoutFeedback>
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

            <TimerModal
              isVisible={isModalVisible}
              type={type}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const DistanceUpdateModal: React.FC<UpdateValueProps> = (props) => (
  <RecordUpdateModal
    {...props}
    title="최장 거리 수정"
    label="KM"
    type='distance'
  />
);

const TimeUpdateModal: React.FC<UpdateValueProps> = (props) => (
  <RecordUpdateModal
    {...props}
    title="최장 시간 수정"
    label="TIME"
    type='time'
  />
);

const PaceUpdateModal: React.FC<UpdateValueProps> = (props) => (
  <RecordUpdateModal
    {...props}
    title="최고 페이스 수정"
    label="TIME"
    type='pace'
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
  modalInputContainers: {
    marginTop: getSize(48),
    gap: getSize(12),
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalInputContainer: {
    paddingLeft: getSize(18),
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(99),
    borderColor: 'white',
    borderWidth: getSize(1),
    borderRadius: 20,
  },
  modalInputTitle: {
    fontSize: getSize(20),
    color: Colors.main,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: getSize(13),
  },
  modalInput: {
    marginRight: getSize(55),
    marginBottom: getSize(25),
    fontSize: getSize(16),
    color: 'white',
    fontFamily: 'Pretendard-Medium',
    marginTop: getSize(10),
  },
});

export {
  DistanceUpdateModal,
  PaceUpdateModal,
  TimeUpdateModal,
};
