import React, { useEffect, useState } from 'react';
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
  KeyboardAvoidingView,
  Platform,
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

const { width, height } = Dimensions.get('window');

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

interface ShoesInfoProps {
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

const ShoesInfoModal: React.FC<ShoesInfoProps & ModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  brand = '',
  model = '',
  edition = '',
  onChangeBrand,
  onChangeModel,
  onChangeEdition,
  ...props
}) => {
  const [tempBrand, setTempBrand] = useState(brand);
  const [tempModel, setTempModel] = useState(model);
  const [tempEdition, setTempEdition] = useState(edition);

  useEffect(() => {
    if (isVisible) {
      setTempBrand(brand);
      setTempModel(model);
      setTempEdition(edition);
    }
  }, [isVisible, brand, model, edition]);

  const handleConfirm = () => {
    onConfirm(tempBrand, tempModel, tempEdition);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={shoesInfoModalStyles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={shoesInfoModalStyles.modalContent}>
            <View style={shoesInfoModalStyles.modalTitleContainer}>
              <Text style={shoesInfoModalStyles.modalTitle}>신발 정보 입력</Text>
            </View>

            <View style={shoesInfoModalStyles.modalBar} />

            <View style={shoesInfoModalStyles.modalInputContainers}>
              <ModalRecordInput
                label="브랜드"
                value={tempBrand}
                onChangeText={setTempBrand}
                placeholder="브랜드를 입력해주세요"
              />
              <ModalRecordInput
                label="모델"
                value={tempModel}
                onChangeText={setTempModel}
                placeholder="모델을 입력해주세요"
              />
              <ModalRecordInput
                label="에디션"
                value={tempEdition}
                onChangeText={setTempEdition}
                placeholder="에디션을 입력해주세요"
              />
            </View>

            <View style={shoesInfoModalStyles.modalBar} />

            <View style={shoesInfoModalStyles.buttonRow}>
              <TouchableOpacity
                style={shoesInfoModalStyles.button}
                onPress={onCancel}
              >
                <Text style={shoesInfoModalStyles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={[
                  shoesInfoModalStyles.button,
                  shoesInfoModalStyles.confirmButton,
                ]}
              >
                <Text
                  style={[
                    shoesInfoModalStyles.buttonText,
                    shoesInfoModalStyles.confirmButtonText,
                  ]}
                >
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


interface ShoesInputProps {
  brandValue: string;
  modelValue: string;
  editionValue: string;
  onChangeBrand: (text: string) => void;
  onChangeModel: (text: string) => void;
  onChangeEdition: (text: string) => void;
  onClear: () => void;
}

const ShoesInput: React.FC<ShoesInputProps> = ({
  brandValue,
  modelValue,
  editionValue,
  onChangeBrand,
  onChangeModel,
  onChangeEdition,
  onClear,
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
    onChangeBrand(newBrand);
    onChangeModel(newModel);
    onChangeEdition(newEdition);
    setModalVisible(false);
  };

  return (
    <View style={styles.modalInputContainer}>
      <View style={styles.inputHeader}>
        <Text style={styles.modalInputTitle}>신발 정보</Text>
        <TouchableOpacity
          style={{
            marginTop: getSize(11),
            marginRight: getSize(10),
          }}
          onPress={onClear}>
          <CancelIcon width={getSize(20)} height={getSize(20)} fill={Colors.gray} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showModal} style={styles.modalInput}>
        {brandValue || modelValue || editionValue
          ? <Text style={styles.modalInputText}>
            {brandValue} {modelValue} {editionValue}
          </Text>
          : <Text style={styles.modalPlaceHolderText}>
            신발 정보를 입력해주세요
          </Text>
        }
      </TouchableOpacity>

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
  );
};

const ShoesUpdateModal: React.FC<ModalProps & UpdateValueProps> = ({
  isVisible = false,
  brandValue = '',
  modelValue = '',
  editionValue = '',
  memoValue = '',
  onCancel,
  onConfirm,
  title = '신발 정보 수정',
}) => {
  const [tempBrand, setTempBrand] = useState(brandValue);
  const [tempModel, setTempModel] = useState(modelValue);
  const [tempEdition, setTempEdition] = useState(editionValue);
  const [tempMemo, setTempMemo] = useState(memoValue);

  useEffect(() => {
    if (isVisible) {
      setTempBrand(brandValue);
      setTempModel(modelValue);
      setTempEdition(editionValue);
      setTempMemo(memoValue);
    }
  }, [isVisible, brandValue, modelValue, editionValue, memoValue]);

  const handleConfirm = () => {
    onConfirm(
      tempBrand,
      tempModel,
      tempEdition,
      tempMemo
    );
  };

  const handleCancel = () => {
    onCancel?.();
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
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />

            <View style={styles.modalInputContainers}>
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
                label='메모'
                value={tempMemo}
                onChangeText={setTempMemo}
                placeholder='메모를 입력해주세요'
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
    height: '100%',
  },
  modalInputText: {
    fontSize: getSize(16),
    color: 'white',
    fontFamily: 'Pretendard-Medium',
    marginTop: getSize(10),
  },
  modalPlaceHolderText: {
    fontSize: getSize(16),
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Pretendard-Medium',
    marginTop: getSize(10),
  },
});

const shoesInfoModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBar: {
    backgroundColor: Colors.lightGrayBox,
    height: getSize(1),
    width: '100%',
  },
  modalTitleContainer: {
    height: getSize(60),
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: getSize(18),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
  modalInputContainers: {
    marginVertical: getSize(50),
    gap: getSize(12),
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
})

export {
  ShoesInfoProps,
  ShoesInput,
  ShoesUpdateModal
};