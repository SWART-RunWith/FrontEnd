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
  buttonText?: string;
  onButtonPressIn?: () => void;
  onButtonPressOut?: () => void;
  errorText?: string;
  unit?: string;
  svgIcon?: React.ReactNode;
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
  buttonText = '',
  onButtonPressIn,
  onButtonPressOut,
  errorText = '',
  unit = '',
  svgIcon = null,
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
        />

        {buttonText ? (
          <TouchableOpacity style={styles.button} onPress={onButtonPressIn}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : unit ? (
          <Text style={styles.unitText}>{unit}</Text>
        ) : svgIcon ? (
          <TouchableOpacity
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
          >
            <View style={styles.svgIconContainer}>
              {svgIcon}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export {
  BarProps,
  DefaultBar
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    marginHorizontal: getSize(Sizes.formMargin),
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
    width: width - 32,
    borderRadius: 10,
    paddingHorizontal: getSize(Sizes.formMargin),
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
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Regular',
    marginLeft: getSize(10),
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

