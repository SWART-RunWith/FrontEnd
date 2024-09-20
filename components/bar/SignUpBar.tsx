import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import {
  BarProps,
  DefaultBar,
} from '@/components/bar/Bar';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';
import Colors from '@/constants/Colors';
import GenderButton from '../button/GenderButton';

const { width, height } = Dimensions.get('window');

// 회원가입 Bar 컴포넌트
const SignUpBar = ({
  isRequired = true,
  ...props
}: BarProps) => {
  return <DefaultBar
    isRequired={isRequired}
    {...props} />;
};

const SignUpNameBar = ({
  label = "이름",
  placeholder = "이름을 입력해주세요",
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
};

const SignUpEmailBar = ({
  label = "이메일",
  placeholder = "이메일을 입력해주세요",
  keyboardType = 'email-address',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      {...props}
    />
  );
};

const SignUpPasswordBar = ({
  label = "비밀번호",
  placeholder = "비밀번호를 입력해주세요",
  ...props
}: BarProps) => {
  const [secureText, setSecureText] = useState(true);
  const [isSecure, setIsSecure] = useState(false);

  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      isSecure={secureText}
      eyeIcon={<Ionicons
        name={secureText ? 'eye-off' : 'eye'}
        size={getSize(20)}
        color="rgba(255, 255, 255, 0.6)"
      />}
      onButtonPress={() => {
        setSecureText(!isSecure);
        setIsSecure(!isSecure);
      }}
      {...props}
    />
  );
};

const SignUpPhoneBar = ({
  label = "전화번호",
  placeholder = "전화번호를 입력해주세요",
  keyboardType = 'phone-pad',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      {...props}
    />
  );
};

const SignUpDateOfBirthBar = ({
  label = "생년월일",
  placeholder = "생년월일을 입력해주세요",
  value,
  onChangeText,
  ...props
}: BarProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(value || '');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date?: Date) => {
    if (Platform.OS !== 'ios') {
      hideDatePicker();
    }
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      setSelectedDate(formattedDate);
      onChangeText && onChangeText(formattedDate);
    }
  };

  return (
    <View>
      <SignUpBar
        label={label}
        placeholder={placeholder}
        value={selectedDate || ''}
        isCalendar={true}
        onButtonPress={showDatePicker}
        canTextInputTouch={false}
        {...props}
      />

      {/* DateTimePicker 표시 */}
      {isDatePickerVisible && (
        Platform.OS === 'ios' ? (
          <Modal
            transparent={true}
            animationType="fade"
            visible={isDatePickerVisible}
            onRequestClose={hideDatePicker}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>생년월일</Text>

                <View style={styles.modalBar} />

                {/* iOS용 DateTimePicker */}
                <DateTimePicker
                  locale="ko-KR"
                  value={selectedDate ? new Date(selectedDate) : new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleConfirm}
                  textColor="white"
                  style={{
                    height: height * 0.5 * 0.8,
                    width: width * 0.8,
                    borderTopWidth: 3,
                    borderTopColor: 'black',
                  }}
                />

                <View style={styles.modalBar} />

                {/* 하단 버튼 (취소/확인) */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={hideDatePicker}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={hideDatePicker}
                    style={[styles.button, styles.confirmButton]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        styles.confirmButtonText,
                      ]}
                    >
                      확인
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          // Android용 DateTimePicker
          <DateTimePicker
            value={selectedDate ? new Date(selectedDate) : new Date()}
            mode="date"
            display="default"
            onChange={handleConfirm}
          />
        )
      )}
    </View>
  );
};

const validateHeight = (height: string) => {
  const heightValue = parseFloat(height)

  if (heightValue > 250) {
    Alert.alert("키 입력 오류", "키가 너무 큽니다. 250 이하의 값을 입력해 주세요.");
    return false;
  }

  return true;
}

const SignUpHeightBar = ({
  label = "키",
  placeholder = "키를 입력해주세요",
  keyboardType = 'decimal-pad',
  unit = 'CM',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      unit={unit}
      onBlur={() => validateHeight(props.value ?? '160')}
      {...props}
    />
  );
};

const validateWeight = (weight: string) => {
  const weightValue = parseFloat(weight)

  if (weightValue > 250) {
    Alert.alert("체중 입력 오류", "체중이 너무 큽니다. 250 이하의 값을 입력해 주세요.");
    return false;
  }

  return true;
}

const SignUpWeightBar = ({
  label = "체중",
  placeholder = "체중을 입력해주세요",
  keyboardType = 'decimal-pad',
  unit = 'KG',
  ...props
}: BarProps) => {
  return (
    <SignUpBar
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      unit={unit}
      onBlur={() => validateWeight(props.value ?? '70')}
      {...props}
    />
  );
};

interface SignUpGenderBarProps {
  label?: string;
  isRequired?: boolean;
  onSelectGender: (gender: '남성' | '여성') => void; // 성별 선택 시 호출할 콜백
  selectedGender: '남성' | '여성' | null; // 현재 선택된 성별
}

const SignUpGenderBar: React.FC<SignUpGenderBarProps> = ({
  label = '성별',
  isRequired = true,
  onSelectGender,
  selectedGender,
}) => {
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
      <View style={styles.genderButtonContainer}>
        {/* 남성 버튼 */}
        <GenderButton
          text="남성"
          isSelected={selectedGender === '남성'}
          onPress={() => onSelectGender('남성')}
        />
        {/* 여성 버튼 */}
        <GenderButton
          text="여성"
          isSelected={selectedGender === '여성'}
          onPress={() => onSelectGender('여성')}
        />
      </View>
    </View>
  );
};

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
  genderButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(56),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.grayBox,
    width: width * 0.8,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBar: {
    backgroundColor: Colors.lightGrayBox,
    height: getSize(1),
    width: '100%',
  },
  modalTitle: {
    fontSize: getSize(18),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    paddingVertical: getSize(15),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // marginTop: 'auto',
  },
  button: {
    flex: 1,
    backgroundColor: Colors.grayBox,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    paddingVertical: getSize(15),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: getSize(16),
    color: 'white',
  },
  confirmButton: {
    backgroundColor: Colors.main,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
  },
  confirmButtonText: {
    color: 'black',
  },
});

export {
  SignUpBar,
  SignUpNameBar,
  SignUpEmailBar,
  SignUpPasswordBar,
  SignUpPhoneBar,
  SignUpDateOfBirthBar,
  SignUpHeightBar,
  SignUpWeightBar,
  SignUpGenderBar,
}