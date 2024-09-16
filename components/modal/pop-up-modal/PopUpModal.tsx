import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import LocationIcon from '@/assets/icons/location.svg';
import FolderIcon from '@/assets/icons/folder.svg';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

interface ActionModalProps {
  visible: boolean;
  type: '코스' | '폴더';
  description: string;
  isSave: boolean,
  leftButtonText: string;
  rightButtonText: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  visible = false,
  type = '코스',
  description,
  isSave = true,
  leftButtonText,
  rightButtonText,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            {type === '코스' ?
              <LocationIcon /> :
              <FolderIcon />
            }
          </View>
          <Text style={styles.title}>
            선택하신 {type}를 {isSave ? '저장' : '삭제'}하시겠습니까?
          </Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={onLeftButtonPress}>
              <Text style={styles.buttonText}>{leftButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={onRightButtonPress}>
              <Text style={styles.buttonText}>{rightButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: getSize(20),
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: getSize(10),
  },
  title: {
    fontSize: getSize(18),
    color: '#FFF',
    fontFamily: 'Pretendard-Bold',
    marginBottom: getSize(8),
  },
  description: {
    fontSize: getSize(14),
    color: '#CCC',
    textAlign: 'center',
    marginBottom: getSize(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftButton: {
    backgroundColor: '#000',
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(20),
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  rightButton: {
    backgroundColor: Colors.main,
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(20),
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Bold',
  },
});

export default ActionModal;
