import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import RNModal from 'react-native-modal';

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';

import CancelIcon from '@/assets/icons/cancel.svg';

const { width, height } = Dimensions.get('window');

interface ProfileModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const ProfileUpdateModal: React.FC<ProfileModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  value,
  onChangeText,
  title = "정보 수정",
  placeholder = "내용을 입력해주세요",
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
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalCancel} onPress={onCancel}>취소</Text>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalConfirm} onPress={onConfirm}>완료</Text>
          </View>

          <View style={styles.modalInputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.modalInputTitle}>{title.slice(0, 2)}</Text>
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  </RNModal>
);

const NameUpdateModal: React.FC<ProfileModalProps> = ({
  title = "이름 수정",
  placeholder = "이름을 입력해주세요",
  ...props
}) => {
  return (
    <ProfileUpdateModal
      title={title}
      placeholder={placeholder}
      {...props}
    />
  );
};

const LocationUpdateModal: React.FC<ProfileModalProps> = ({
  title = "위치 수정",
  placeholder = "위치를 입력해주세요",
  ...props
}) => {
  return (
    <ProfileUpdateModal
      title={title}
      placeholder={placeholder}
      {...props}
    />
  );
};

const DescriptionUpdateModal: React.FC<ProfileModalProps> = ({
  title = "소개 수정",
  placeholder = "소개를 입력해주세요",
  ...props
}) => {
  return (
    <ProfileUpdateModal
      title={title}
      placeholder={placeholder}
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

export {
  ProfileUpdateModal,
  NameUpdateModal,
  LocationUpdateModal,
  DescriptionUpdateModal,
};
