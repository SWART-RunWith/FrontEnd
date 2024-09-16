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
import Sizes from '@/constants/Sizes';

interface ActionModalProps {
  visible: boolean;
  type: '코스' | '폴더';
  description: string;
  isSave: boolean,
  isLeftMain: boolean;
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
  isLeftMain = true,
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
              <LocationIcon width={getSize(17)} height={getSize(24)} /> :
              <FolderIcon width={getSize(24)} height={getSize(20.31)} />
            }
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              선택하신 {type}를 {isSave ? '저장' : '삭제'}하시겠습니까?
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onLeftButtonPress} style={[
              styles.button,
              isLeftMain && { backgroundColor: Colors.main }
            ]}
            >
              <Text style={[
                styles.buttonText,
                isLeftMain && { color: 'black' }
              ]}>
                {leftButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRightButtonPress} style={[
              styles.button,
              !isLeftMain && { backgroundColor: Colors.main }
            ]}>
              <Text style={[
                styles.buttonText,
                !isLeftMain && { color: 'black' }
              ]}>
                {rightButtonText}
              </Text>
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
    backgroundColor: Colors.darkGrayBox,
    alignItems: 'center',
    width: getSize(358),
    height: getSize(214),
    borderRadius: 26,
    padding: getSize(Sizes.formMargin),
  },
  iconContainer: {
    backgroundColor: Colors.grayBox,
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize(46),
    height: getSize(46),
    borderRadius: 100,
  },
  textContainer: {
    marginTop: getSize(11),
    alignItems: 'center',
    height: getSize(67.88),
  },
  title: {
    fontSize: getSize(20),
    fontFamily: 'Pretendard-SemiBold',
    color: '#FFF',
    textAlign: 'center',
  },
  description: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: Colors.main,
    marginTop: getSize(12),
  },
  buttonContainer: {
    marginTop: getSize(17),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.grayBox,
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize(155),
    height: getSize(40),
    borderRadius: 10,
  },
  buttonText: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
  },
});

export default ActionModal;
