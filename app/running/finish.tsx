import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { RunningFinishScreenRouteProp } from '@/scripts/navigation';
import { formatDistance, formatTime } from '@/scripts/format';
import { calculatePace } from '@/scripts/calculatePace';

const FinishScreen = () => {
  const route = useRoute<RunningFinishScreenRouteProp>();
  const { seconds, meters, pace, heartRate } = route.params;

  const [showModal, setShowModal] = useState(false);

  const handleSaveCourse = () => {
    setShowModal(true); // 코스 저장하기를 누르면 모달창이 뜸
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {/* 러닝 완료 정보 */}
      <View style={styles.infoContainer}>
        <Text style={styles.headerText}>러닝 완료!</Text>
        <Text style={styles.timeText}>{formatTime(seconds)}</Text>
        <Text style={styles.distanceText}>{formatDistance(meters)}KM</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>페이스</Text>
          <Text style={styles.statText}>{pace}</Text>
          <Text style={styles.statText}>심박수</Text>
          <Text style={styles.statText}>{heartRate}</Text>
          <Text style={styles.statText}>칼로리 111</Text>
        </View>
      </View>

      {/* 코스 저장하기 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCourse}>
        <Text style={styles.saveButtonText}>코스 저장하기</Text>
      </TouchableOpacity>

      {/* 모달창 */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>선택하신 코스를 저장하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
                <Text>아니요</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
                <Text>저장하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  distanceText: {
    fontSize: 48,
    color: '#B0FF3D',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  statText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#B0FF3D',
    padding: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#B0FF3D',
    borderRadius: 10,
  },
});

export default FinishScreen;
