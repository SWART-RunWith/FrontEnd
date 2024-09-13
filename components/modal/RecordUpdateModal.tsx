import React, { useEffect, useState } from 'react';
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
import { ShoesInput } from '@/components/modal/ShoesUpdateModal';
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
  brandValue?: string;
  modelValue?: string;
  editionValue?: string;
  memoValue?: string;
  onChangeText: (text: string) => void;
  onChangeBrand: (text: string) => void;
  onChangeModel: (text: string) => void;
  onChangeEdition: (text: string) => void;
  onChangeMemo: (text: string) => void;
  onCancel?: () => void;
  onConfirm?: (
    newValue: string,
    newBrand: string,
    newModel: string,
    newEdition: string,
    newMemo: string
  ) => void;
}

const RecordUpdateModal: React.FC<ModalProps & UpdateValueProps> = ({
  isVisible,
  value = '',
  brandValue = '',
  modelValue = '',
  editionValue = '',
  memoValue = '',
  onCancel,
  onConfirm,
  label = '',
  title = '수정',
  type = 'distance',
}) => {
  const [tempValue, setTempValue] = useState(value);
  const [tempBrand, setTempBrand] = useState(brandValue);
  const [tempModel, setTempModel] = useState(modelValue);
  const [tempEdition, setTempEdition] = useState(editionValue);
  const [tempMemo, setTempMemo] = useState(memoValue);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTempValue(value);
      setTempBrand(brandValue);
      setTempModel(modelValue);
      setTempEdition(editionValue);
      setTempMemo(memoValue);
    }
  }, [
    isVisible,
    value,
    brandValue,
    modelValue,
    editionValue,
    memoValue
  ]);

  const handleConfirm = () => {
    onConfirm?.(
      tempValue,
      tempBrand,
      tempModel,
      tempEdition,
      tempMemo
    );
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={handleCancel}
      style={styles.bottomModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ModalHeader
              title={title}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />

            <View style={styles.modalInputContainers}>
              <TouchableWithoutFeedback
                onPress={() => handleShowModal()}>
                <View style={styles.modalInputContainer}>
                  <View style={styles.inputHeader}>
                    <Text style={styles.modalInputTitle}>{label}</Text>
                    <TouchableOpacity
                      style={{
                        marginTop: getSize(11),
                        marginRight: getSize(10),
                      }}
                      onPress={() => setTempValue('')}
                    >
                      <CancelIcon
                        width={getSize(20)}
                        height={getSize(20)}
                        fill={Colors.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.modalInput}>{tempValue}</Text>
                </View>
              </TouchableWithoutFeedback>

              <ShoesInput
                brandValue={tempBrand}
                modelValue={tempModel}
                editionValue={tempEdition}
                onChangeBrand={setTempBrand}
                onChangeModel={setTempModel}
                onChangeEdition={setTempEdition}
                onClear={() => {
                  setTempBrand('');
                  setTempModel('');
                  setTempEdition('');
                }}
              />

              <ModalRecordInput
                label="메모"
                value={tempMemo}
                onChangeText={setTempMemo}
                placeholder="메모를 입력해주세요"
              />
            </View>

            <TimerModal
              isVisible={isModalVisible}
              type={type}
              onCancel={handleCloseModal}
              onConfirm={(selected: string) => {
                setTempValue(selected);
                handleCloseModal();
              }}
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
