import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';
import { CourseButton } from '@/components/button/RunningButton';
import { BackHeader } from '@/components/header/IconHeader';
import { MyCourseSaveModal } from '@/components/modal/pop-up/CourseModal';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import {
  RunningFinishScreenRouteProp,
  RunningScreenNavigationProp
} from '@/scripts/navigation';
import { formatDistance, formatTime } from '@/scripts/format';
import getSize from '@/scripts/getSize';
import { resetNavigationStack } from '@/scripts/resetNavigationStack';
import BottomTab from '@/components/BottomTab';
import Fonts from '@/constants/Fonts';

const { width } = Dimensions.get('window');

const FinishScreen = () => {
  const navigation = useNavigation<RunningScreenNavigationProp>();
  const route = useRoute<RunningFinishScreenRouteProp>();
  const { seconds, meters, pace, heartRate } = route.params;

  const [showModal, setShowModal] = useState(false);

  const handleSaveCourse = () => {
    // to do : 코스 저장 api 연결
    console.log('코스 저장');
    setShowModal(false);
    navigation.navigate('running/save');
  };

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    resetNavigationStack(navigation, 'home');
  };

  return (
    <View style={styles.container}>
      <BackHeader onPressBack={() => { navigation.goBack() }} />

      <Image
        style={styles.imageStyle}
        source={require('@/assets/images/trophy.png')} />

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
      </View>

      <View style={styles.courseBox}>
        <View style={styles.buttonContainer}>
          <CourseButton
            onPress={handleShowModal}
            width={177}
            text='코스 저장하기'
          />
        </View>
      </View>

      {/* 모달창 */}
      <MyCourseSaveModal
        visible={showModal}
        isLeftMain={false}
        onLeftButtonPress={handleCloseModal}
        onRightButtonPress={() => { handleSaveCourse() }}
      />

      <BottomTab route='Running' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  textContainer: {
    marginTop: getSize(32),
  },
  headerText: {
    fontSize: getSize(24),
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
    height: getSize(29),
  },
  timeText: {
    fontSize: getSize(20),
    fontFamily: Fonts.semiBold,
    color: '#FFFFFF',
    height: getSize(24),
    marginTop: getSize(14),
  },
  distanceText: {
    fontSize: getSize(50),
    height: getSize(60),
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
    position: 'absolute',
    width: getSize(77),
    height: getSize(144),
    top: getSize(125),
    right: getSize(16),
    resizeMode: 'contain',
  },
  courseBox: {
    backgroundColor: Colors.grayBox,
    alignItems: 'center',
    width: width - getSize(Sizes.formMargin) * 2,
    height: getSize(402),
    borderRadius: 20,
    marginTop: getSize(20.5),
  },
  buttonContainer: {
    top: getSize(344),
  },
});

export default FinishScreen;
