import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput
} from 'react-native';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

interface ProfileUpdateDataModalProps {
  title: string;
  placeholder: string;
  value: string;
  onConfirm: (newValue: string) => void;
  isVisible: boolean;
  onCancel: () => void;
}

const ProfileUpdateDataModal: React.FC<ProfileUpdateDataModalProps> = ({
  title,
  placeholder,
  value,
  onConfirm,
  isVisible,
  onCancel,
}) => {
  const [tempValue, setTempValue] = useState(value);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={tempValue}
            onChangeText={setTempValue}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onConfirm(tempValue);
                onCancel();
              }}
            >
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// NameUpdateModal 정의
interface UpdateModalProps {
  isVisible: boolean;
  onCancel: () => void;
  value: string;
  onConfirm: (newValue: string) => void;
}

const NameUpdateModal: React.FC<UpdateModalProps> = ({
  isVisible,
  onCancel,
  value,
  onConfirm
}) => {
  return (
    <ProfileUpdateDataModal
      title="이름 수정"
      placeholder="이름을 입력해주세요"
      value={value}
      onConfirm={onConfirm}
      isVisible={isVisible}
      onCancel={onCancel}
    />
  );
};

// LocationUpdateModal 정의
const LocationUpdateModal: React.FC<UpdateModalProps> = ({
  isVisible,
  onCancel,
  value,
  onConfirm
}) => {
  return (
    <ProfileUpdateDataModal
      title="위치 수정"
      placeholder="위치를 입력해주세요"
      value={value}
      onConfirm={onConfirm}
      isVisible={isVisible}
      onCancel={onCancel}
    />
  );
};

// DescriptionUpdateModal 정의
const DescriptionUpdateModal: React.FC<UpdateModalProps> = ({
  isVisible,
  onCancel,
  value,
  onConfirm
}) => {
  return (
    <ProfileUpdateDataModal
      title="소개 수정"
      placeholder="소개를 입력해주세요"
      value={value}
      onConfirm={onConfirm}
      isVisible={isVisible}
      onCancel={onCancel}
    />
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: getSize(18),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: getSize(20),
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.main,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: Colors.main,
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: Colors.grayBox,
    padding: 10,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
  },
  cancelButtonText: {
    color: 'white',
  },
});

export {
  ProfileUpdateDataModal,
  NameUpdateModal,
  LocationUpdateModal,
  DescriptionUpdateModal,
};
