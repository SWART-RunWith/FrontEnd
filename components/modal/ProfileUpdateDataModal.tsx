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
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';

import {
  ModalHeader,
  ModalProfileInput,
  ModalProps,
} from '@/components/modal/UpdateModal';

const { width, height } = Dimensions.get('window');

const ProfileUpdateModal: React.FC<ModalProps & { title: string }> = ({
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
    avoidKeyboard={false}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

          <ModalProfileInput
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

const NameUpdateModal: React.FC<ModalProps> = ({
  ...props
}) => {
  return (
    <ProfileUpdateModal
      title='이름 수정'
      label='이름'
      placeholder='이름을 입력해주세요'
      {...props}
    />
  );
};

const LocationUpdateModal: React.FC<ModalProps> = ({
  ...props
}) => {
  return (
    <ProfileUpdateModal
      title='위치 수정'
      label='위치'
      placeholder='위치를 입력해주세요'
      {...props}
    />
  );
};

const DescriptionUpdateModal: React.FC<ModalProps> = ({
  ...props
}) => {
  return (
    <ProfileUpdateModal
      title='소개 수정'
      label='소개'
      placeholder='소개를 입력해주세요'
      {...props}
    />
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
  ModalProfileInputContainer: {
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
  ModalProfileInputTitle: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
    marginTop: getSize(18),
  },
  ModalProfileInput: {
    marginRight: getSize(55),
    marginBottom: getSize(25),
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Light',
    marginTop: getSize(10),
  },
});

export {
  NameUpdateModal,
  LocationUpdateModal,
  DescriptionUpdateModal,
};
