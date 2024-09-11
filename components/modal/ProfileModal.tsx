import React from 'react';
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
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해

import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import getSize from '@/scripts/getSize';

const { width } = Dimensions.get('window');

interface ProfileModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const ProfileUpdateModal: React.FC<ProfileModalProps> = ({ isVisible, onCancel, onConfirm, title, value, onChangeText, placeholder }) => (
  <RNModal
    isVisible={isVisible}
    onBackdropPress={onCancel}
    style={styles.bottomModal}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalCancel} onPress={onCancel}>취소</Text>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalConfirm} onPress={onConfirm}>완료</Text>
          </View>

          <View style={styles.modalInputContainer}>
            <View style={styles.inputHeader}>
              <Text style={styles.modalInputTitle}>{title.slice(0, 2)}</Text>
              {/* x 버튼 */}
              <TouchableOpacity onPress={() => onChangeText('')}>
                <Ionicons name="close-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              style={styles.modalInput}
              placeholder={placeholder}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </RNModal>
);

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
    height: getSize(400),
    padding: 20,
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
    paddingHorizontal: getSize(18),
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
    alignItems: 'center',
    marginBottom: getSize(10),
  },
  modalInputTitle: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
    marginTop: getSize(18),
  },
  modalInput: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Light',
    marginTop: getSize(10),
  },
});

export {
  ProfileUpdateModal
};
