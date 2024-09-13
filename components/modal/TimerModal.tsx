import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

const { width, height } = Dimensions.get('window');

interface TimerModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (value: string) => void;
  type: 'distance' | 'pace' | 'time';
}

const TimerModal: React.FC<TimerModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  type,
}) => {
  const [km, setKm] = useState('0');
  const [m, setM] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [hours, setHours] = useState('0');

  const handleConfirm = () => {
    if (type === 'distance') {
      onConfirm(`${km}.${formatNumber(m)} KM`);
    } else if (type === 'pace') {
      onConfirm(`${minutes}'${formatNumber(seconds)}''`);
    } else if (type === 'time') {
      onConfirm(`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`);
    }
  };

  const formatNumber = (value: string) => {
    return value.length === 1
      ? `0${value}`
      : `${value}`;
  };

  const renderPickerContent = () => {
    switch (type) {
      case 'distance':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={km}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setKm(itemValue)}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>.</Text>
            <Picker
              selectedValue={m}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setM(itemValue)}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>KM</Text>
          </View>
        );
      case 'pace':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={minutes}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setMinutes(itemValue)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>'</Text>
            <Picker
              selectedValue={seconds}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setSeconds(itemValue)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>''</Text>
          </View>
        );
      case 'time':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hours}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setHours(itemValue)}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>:</Text>
            <Picker
              selectedValue={minutes}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setMinutes(itemValue)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>:</Text>
            <Picker
              selectedValue={seconds}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setSeconds(itemValue)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i}`} value={`${i}`} />
              ))}
            </Picker>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>
                {type === 'distance' ? '거리 설정' : type === 'pace' ? '페이스 설정' : '시간 설정'}
              </Text>
            </View>

            <View style={styles.modalBar} />

            {renderPickerContent()}

            <View style={styles.modalBar} />

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={onCancel}
              >
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={[styles.button, styles.confirmButton]}
              >
                <Text
                  style={[styles.buttonText, styles.confirmButtonText]}
                >
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  timerBox: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.8,
    marginVertical: 10,
  },
  timerText: {
    color: 'yellow',
    fontSize: 18,
  },
  timerValue: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalBar: {
    backgroundColor: Colors.lightGrayBox,
    height: getSize(1),
    width: '100%',
  },
  modalTitleContainer: {
    height: getSize(60),
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: getSize(18),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
  pickerContainer: {
    width: '90%',
    height: getSize(250),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getSize(5)
  },
  picker: {
    width: getSize(100),
  },
  pickerItem: {
    fontSize: getSize(16),
    color: 'white',
  },
  pickerLabel: {
    color: 'white',
    fontSize: getSize(16),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: getSize(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: getSize(16),
    color: 'white',
  },
  confirmButton: {
    backgroundColor: Colors.main,
    borderBottomRightRadius: 10,
  },
  confirmButtonText: {
    color: 'black',
  },
});

export {
  TimerModal,
};
