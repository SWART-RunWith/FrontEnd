import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';

const { width, height } = Dimensions.get('window');

interface BarProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isSecure?: boolean;
  showIcon?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  errorText?: string;
  unit?: string;
}

const Bar: React.FC<BarProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  isSecure = false,
  showIcon = false,
  buttonText,
  onButtonPress,
  errorText,
  unit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {showIcon && <Ionicons name="checkmark-circle" size={getSize(14)} color={Colors.main} />}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={"rgba(255, 255, 255, 0.22)"}
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
    width: getSize(width - 32),
    borderRadius: 10,
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: getSize(Sizes.boxText),
    color: 'white',
    fontFamily: 'Pretendard-Regular',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Pretendard-Bold',
  },
  unitText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Pretendard-Regular',
    marginLeft: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    fontFamily: 'Pretendard-Regular',
  },
});

export default Bar;
