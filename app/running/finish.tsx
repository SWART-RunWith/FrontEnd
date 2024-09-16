import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  RunningFinishScreenRouteProp,
  RunningScreenNavigationProp
} from '@/scripts/navigation';
import { formatDistance, formatTime } from '@/scripts/format';
import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import { BackHeader } from '@/components/header/IconHeader';
import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';

const FinishScreen = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();
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
      <BackHeader onPressBack={() => { navigation.goBack() }} />

      {/* 러닝 완료 정보 */}
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>러닝 완료!</Text>
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
          <Text style={styles.distanceText}>{formatDistance(meters)}KM</Text>

          <View style={[styles.statsContainer, { marginTop: getSize(17) }]}>
            <View style={styles.statLeftContainer}>
              <Text style={styles.statLabelText}>페이스</Text>
              <Text style={styles.statText}>{pace}</Text>
            </View>
            <View style={styles.statRightContainer}>
              <Text style={styles.statLabelText}>심박수</Text>
              <Text style={styles.statText}>{heartRate}</Text>
              <EmptyHeartIcon />
            </View>
          </View>

          <View style={[styles.statsContainer, { marginTop: getSize(12) }]}>
            <View style={styles.statLeftContainer}>
              <Text style={styles.statLabelText}>고도 상승</Text>
              <Text style={styles.statText}>{pace}</Text>
            </View>
            <View style={styles.statRightContainer}>
              <Text style={styles.statLabelText}>칼로리</Text>
              <Text style={styles.statText}>{heartRate}</Text>
            </View>
          </View>
        </View>

        <Image
          style={styles.imageStyle}
          source={require('@/assets/images/trophy.png')} />
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
    backgroundColor: 'black',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getSize(16),
  },
  textContainer: {
    marginTop: getSize(60),
  },
  headerText: {
    fontSize: getSize(24),
    fontFamily: 'Pretendard-Bold',
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: getSize(20),
    fontFamily: 'Pretendard-SemiBold',
    color: '#FFFFFF',
    marginTop: getSize(14),
  },
  distanceText: {
    fontSize: getSize(50),
    color: Colors.main,
    fontFamily: 'Pretendard-Black',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: getSize(20),
  },
  statLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getSize(134),
  },
  statRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getSize(8),
  },
  statLabelText: {
    fontSize: getSize(18),
    fontFamily: 'Pretendard-Bold',
    color: '#FFFFFF',
  },
  statText: {
    fontSize: getSize(20),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
  imageStyle: {
    width: getSize(77),
    height: getSize(144),
    marginTop: getSize(67),
    resizeMode: 'contain',
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
