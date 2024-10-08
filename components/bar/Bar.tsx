import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardTypeOptions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import CalendarIcon from '@/assets/icons/calendar.svg';

const { width } = Dimensions.get('window');

interface BarProps {
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChangeText?: (text: string) => void;
  isSecure?: boolean;
  isRequired?: boolean;
  canTextInputTouch?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  errorText?: string;
  unit?: string;
  eyeIcon?: React.ReactNode;
  isCalendar?: boolean;
  onBlur?: () => void;
}

// 기본 Bar 컴포넌트
const DefaultBar = ({
  label = '',
  placeholder = '',
  placeholderTextColor = "rgba(255, 255, 255, 0.22)",
  keyboardType = 'default',
  value = '',
  onChangeText,
  isSecure = false,
  isRequired = false,
  canTextInputTouch = true,
  buttonText = '',
  onButtonPress,
  errorText = '',
  unit = '',
  eyeIcon = null,
  isCalendar = false,
  onBlur,
}: BarProps) => {
  return (
    <View style={styles.container}>
      {/* 라벨 */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && (
          <Ionicons
            name="checkmark-circle"
            size={getSize(14)}
            color={Colors.main}
          />
        )}
      </View>

      {/* 입력 창 */}
      <View style={styles.inputContainer}>
        <TextInput
          onBlur={onBlur}
          style={styles.keyboard}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          editable={canTextInputTouch}
        />

        {buttonText ? (
          <TouchableOpacity style={styles.button} onPress={onButtonPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : unit ? (
          <Text style={styles.unitText}>{unit}</Text>
        ) : eyeIcon ? (
          <TouchableOpacity
            onPress={onButtonPress}
          >
            <View style={styles.svgIconContainer}>
              {eyeIcon}
            </View>
          </TouchableOpacity>
        ) : isCalendar ? (
          <TouchableOpacity
            onPress={onButtonPress}
          >
            <View style={styles.svgIconContainer} >
              <CalendarIcon width={getSize(22)} height={getSize(24)} fill='white' />
            </View>
          </TouchableOpacity>)
          : null}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export {
  BarProps,
  DefaultBar,
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    marginHorizontal: getSize(Sizes.formMargin),
    height: getSize(81),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize(8),
  },
  label: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Medium',
    color: 'white',
    marginRight: getSize(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
    height: getSize(56),
    width: width - getSize(Sizes.formMargin) * 2,
    borderRadius: 10,
    paddingHorizontal: getSize(18),
  },
  keyboard: {
    flex: 1,
    paddingVertical: getSize(10),
    fontSize: getSize(Sizes.boxText),
    color: 'white',
    fontFamily: 'Pretendard-Regular',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: getSize(15),
    paddingVertical: getSize(10),
    borderRadius: 5,
  },
  buttonText: {
    fontSize: getSize(14),
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },
  unitText: {
    fontSize: getSize(20),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
  },
  svgIconContainer: {
    marginLeft: getSize(10),
  },
  errorText: {
    fontSize: getSize(12),
    color: 'red',
    marginTop: getSize(5),
    fontFamily: 'Pretendard-Regular',
  },
});

