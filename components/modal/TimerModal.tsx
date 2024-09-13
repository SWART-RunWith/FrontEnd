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

const { width } = Dimensions.get('window');
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

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
      onConfirm(`${km}.${m} KM`);
    } else if (type === 'pace') {
      onConfirm(`${minutes}'${seconds}''`);
    } else if (type === 'time') {
      onConfirm(`${hours}:${minutes}:${seconds}`);
    }
  };

  const renderPickerContent = () => {
    switch (type) {
      case 'distance':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={km}
              style={styles.picker}
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
            <Text style={styles.modalTitle}>
              {type === 'distance' ? '거리 설정' : type === 'pace' ? '페이스 설정' : '시간 설정'}
            </Text>

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

const TimerInput = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('0:00 KM');

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleConfirm = (value: string) => {
    setSelectedValue(value);
    hideModal();
  };

  return (
    <View>
      {/* Display Selected Value */}
      <TouchableOpacity onPress={showModal}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>거리</Text>
          <Text style={styles.timerValue}>{selectedValue}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Time Picker */}
      <TimerModal
        isVisible={isModalVisible}
        onCancel={hideModal}
        onConfirm={handleConfirm}
        type="distance" // You can also use "pace" or "time"
      />
    </View>
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.grayBox,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalBar: {
    backgroundColor: Colors.lightGrayBox,
    height: getSize(1),
    width: width,
  },
  modalTitle: {
    fontSize: getSize(18),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    paddingVertical: getSize(15),
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 100,
  },
  pickerLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: getSize(15),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: getSize(16),
    color: 'white',
  },
  confirmButton: {
    backgroundColor: Colors.main,
  },
  confirmButtonText: {
    color: 'black',
  },
});

export {
  TimerModal,
};
