import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RNModal from 'react-native-modal';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';
import {
  ModalHeader,
  ModalRecordInput,
} from '@/components/modal/UpdateModal';
import CancelIcon from '@/assets/icons/cancel.svg';

const { width } = Dimensions.get('window');

interface ModalProps {
  isVisible?: boolean;
  label?: string;
  title?: string;
  onCancel?: () => void;
}

interface UpdateValueProps {
  brandValue?: string;
  modelValue?: string;
  editionValue?: string;
  memoValue?: string;
  onChangeBrand: (text: string) => void;
  onChangeModel: (text: string) => void;
  onChangeEdition: (text: string) => void;
  onChangeMemo: (text: string) => void;
  onConfirm: (
    newBrand: string,
    newModel: string,
    newEdition: string,
    newMemo: string
  ) => void;
}

interface ShoesProps {
  brand?: string;
  model?: string;
  edition?: string;
  onChangeBrand: (text: string) => void;
  onChangeModel: (text: string) => void;
  onChangeEdition: (text: string) => void;
  onConfirm: (
    newBrand: string,
    newModel: string,
    newEdition: string,
  ) => void;
}

const ShoesInfoModal: React.FC<ShoesProps & ModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  brand = '',
  model = '',
  edition = '',
  ...props
}) => {
  return (
    <Modal
      transparent
      animationType='slide'
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View>
        <ModalRecordInput
          label='브랜드'
          value={brand}
          onChangeText={props.onChangeBrand}
          placeholder='브랜드를 입력해주세요'
        />
        <ModalRecordInput
          label='모델'
          value={model}
          onChangeText={props.onChangeModel}
          placeholder='모델을 입력해주세요'
        />
        <ModalRecordInput
          label='에디션'
          value={edition}
          onChangeText={props.onChangeEdition}
          placeholder='에디션을 입력해주세요'
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onConfirm(brand, model, edition)}
          style={[styles.button, styles.confirmButton]}
        >
          <Text
            style={[styles.buttonText, styles.confirmButtonText]}
          >
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const ShoesUpdateModal: React.FC<ModalProps & UpdateValueProps> = ({
  isVisible = false,
  brandValue = '',
  modelValue = '',
  editionValue = '',
  memoValue = '',
  onChangeBrand,
  onChangeModel,
  onChangeEdition,
  onChangeMemo,
  onCancel,
  onConfirm,
  label = '신발 정보',
  title = '신발 정보 수정',
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = (
    newBrand: string,
    newModel: string,
    newEdition: string,
  ) => {
    setModalVisible(false);
    onChangeBrand(newBrand);
    onChangeModel(newModel);
    onChangeEdition(newEdition);
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      style={styles.bottomModal}
      avoidKeyboard={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ModalHeader
              title={title}
              onCancel={onCancel}
              onConfirm={() => {
                if (onConfirm) {
                  onConfirm(
                    brandValue === '' ? '' : brandValue,
                    modelValue === '' ? '' : modelValue,
                    editionValue === '' ? '' : editionValue,
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
                      onPress={() => {
                        onChangeBrand('');
                        onChangeModel('');
                      }}>
                      <CancelIcon width={getSize(20)} height={getSize(20)} fill={Colors.gray} />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    value={
                      brandValue || modelValue || editionValue
                        ? `${brandValue} ${modelValue} ${editionValue}`
                        : ''
                    }
                    style={styles.modalInput}
                    placeholder='신발 정보를 입력해주세요'
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  />
                </View>
              </TouchableWithoutFeedback>
              <ModalRecordInput
                label='메모'
                value={memoValue}
                onChangeText={onChangeMemo}
                placeholder='메모를 입력해주세요'
              />
            </View>

            <ShoesInfoModal
              isVisible={isModalVisible}
              brand={brandValue}
              model={modelValue}
              edition={editionValue}
              onChangeBrand={onChangeBrand}
              onChangeModel={onChangeModel}
              onChangeEdition={onChangeEdition}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
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
  modalInputContainers: {
    marginTop: getSize(48),
    gap: getSize(12),
  },
  modalInputContainer: {
    paddingLeft: getSize(18),
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(99),
    borderColor: 'white',
    borderWidth: getSize(1),
    borderRadius: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: getSize(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: getSize(16),
    color: 'white',
  },
  confirmButton: {
    backgroundColor: Colors.main,
    borderBottomRightRadius: 10,
  },
  confirmButtonText: {
    color: 'black',
  },
});

export {
  ShoesProps,
  ShoesInfoModal,
  ShoesUpdateModal

};