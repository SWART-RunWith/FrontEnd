import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const { width, height } = Dimensions.get('window');

interface BarProps {
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isSecure?: boolean;
  showIcon?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  errorText?: string;
  unit?: string;
}

const Bar = ({
  label = '',
  placeholder = '',
  placeholderTextColor = "rgba(255, 255, 255, 0.22)",
  value = '',
  onChangeText,
  isSecure = false,
  showIcon = false,
  buttonText = '',
  onButtonPress,
  errorText = '',
  unit = '',
}: BarProps) => {
  return (
    <View style={styles.container}>
      {/* 라벨 */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {showIcon && <Ionicons
          name="checkmark-circle"
          size={getSize(14)}
          color={Colors.main}
        />}
      </View>

      {/* 입력 창 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />

        {buttonText && (
          <TouchableOpacity style={styles.button} onPress={onButtonPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}

        {unit && (
          <Text style={styles.unitText}>{unit}</Text>
        )}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

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
    marginLeft: getSize(Sizes.formMargin),
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
  textInput: {
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
  errorText: {
    fontSize: getSize(12),
    color: 'red',
    marginTop: getSize(5),
    fontFamily: 'Pretendard-Regular',
  },
});

const EmailBar = ({
  label = "이메일",
  placeholder = "이메일을 입력해주세요",
  ...props
}: BarProps) => {
  return <Bar
    label={label}
    placeholder={placeholder}
    {...props}
  />;
};

const PasswordBar = ({
  label = "비밀번호",
  placeholder = "비밀번호를 입력해주세요",
  isSecure = true,
  ...props
}: BarProps) => {
  return <Bar
    label={label}
    placeholder={placeholder}
    isSecure={isSecure}
    {...props}
  />;
};

export {
  Bar,
  EmailBar,
  PasswordBar,
};
