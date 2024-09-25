import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';

import LocationIcon from '@/assets/icons/location.svg';
import FolderIcon from '@/assets/icons/folder.svg';
import CancelIcon from '@/assets/icons/cancel.svg';
import Colors from '@/constants/Colors';
import Styles from '@/constants/Styles';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';
import Fonts from '@/constants/Fonts';

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

export const ActionModal: React.FC<ActionModalProps> = ({
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
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={20} style={Styles.blurContainer}>

          <View style={styles.modalContent}>
            {/* icon */}
            <View style={styles.iconContainer}>
              {type === '코스' ?
                <LocationIcon width={getSize(17)} height={getSize(24)} /> :
                <FolderIcon width={getSize(24)} height={getSize(20.31)} />
              }
            </View>

            {/* text */}
            <View style={styles.textContainer}>
              <View style={{ height: getSize(24) }}>
                <Text style={styles.title}>
                  선택하신 {type}를 {isSave ? '저장' : '삭제'}하시겠습니까?
                </Text>
              </View>
              <View style={{ height: getSize(17), marginTop: getSize(10) }}>
                <Text style={styles.description}>{description}</Text>
              </View>
            </View>

            {/* button */}
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
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  description: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: Colors.main,
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

interface EditModalProps {
  visible: boolean;
  isLeftMain: boolean;
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  leftButtonText: string;
  rightButtonText: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  visible = false,
  isLeftMain = true,
  title = '',
  value,
  onChangeText,
  leftButtonText,
  rightButtonText,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  const resetText = () => {
    onChangeText('');
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={Keyboard.dismiss}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[{ flex: 1 }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalContainer}>
            <BlurView intensity={20} style={Styles.blurContainer}>

              <View style={[styles.modalContent, { paddingTop: 0 }]}>
                {/* title */}
                <View style={editStyles.titleContainer}>
                  <Text style={editStyles.title}>{title}</Text>
                </View>

                {/* text bar */}
                <View style={editStyles.textContainer}>
                  <TextInput
                    style={editStyles.textInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder='코스 이름을 적성해주세요'
                    placeholderTextColor={Colors.placeholder}
                  />
                  <TouchableOpacity
                    style={editStyles.cancelIcon}
                    onPress={resetText}
                  >
                    <CancelIcon width={getSize(22.65)} height={getSize(24)} />
                  </TouchableOpacity>
                </View>

                {/* button */}
                <View style={[styles.buttonContainer, { marginTop: getSize(26) }]}>
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
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const editStyles = StyleSheet.create({
  titleContainer: {
    marginTop: getSize(37),
    height: getSize(24),
  },
  title: {
    color: Colors.main,
    fontSize: getSize(20),
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: Colors.grayBox,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: getSize(326),
    height: getSize(56),
    borderRadius: 10,
    paddingHorizontal: getSize(14),
    marginTop: getSize(15),
  },
  textInput: {
    color: 'white',
    fontSize: getSize(16),
    fontFamily: Fonts.semiBold,
    width: '100%',
  },
  cancelIcon: {
    position: 'absolute',
    right: getSize(14),
  },
})