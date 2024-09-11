import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';

import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

const { width, height } = Dimensions.get('window');

interface CameraModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onImageSelect: (uri: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({
  isVisible,
  onCancel,
  onImageSelect
}) => {

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelect(result.assets[0].uri);
      }
    } else {
      Alert.alert('카메라 접근이 거부되었습니다.');
    }
    onCancel();
  };

  const openLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelect(result.assets[0].uri);
      }
    } else {
      Alert.alert('라이브러리 접근이 거부되었습니다.');
    }
    onCancel();
  };

  return (
    <>
      {isVisible && (
        <BlurView
          intensity={20}
          style={styles.absoluteBlur}
        />
      )}

      <Modal
        transparent={true}
        visible={isVisible}
        animationType='slide'
        onRequestClose={onCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={openLibrary}>
              <Text style={styles.modalButtonText}>라이브러리에서 선택</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
              <Text style={styles.modalButtonText}>촬영</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.modalCancelButton} onPress={onCancel}>
            <Text style={styles.modalCancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: Colors.darkGrayBox,
    borderRadius: 10,
    marginBottom: getSize(11),
    width: width - getSize(Sizes.formMargin) * 2,
  },
  modalButton: {
    height: getSize(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: getSize(18),
    color: Colors.main, // 텍스트 색상
    fontFamily: 'Pretendard-SemiBold',
  },
  modalCancelButton: {
    backgroundColor: Colors.lightGrayBox,
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(56.31),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getSize(35),
    borderRadius: 10,
  },
  modalCancelButtonText: {
    fontSize: getSize(18),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
  },
  divider: {
    height: getSize(1),
    backgroundColor: Colors.lightGrayBox,
    width: '100%',
  },
  absoluteBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
});

export {
  CameraModal
};
