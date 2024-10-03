import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import apiClient from '@/axois';

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

  const handleSaveCourse = async () => {
    try {
      const newData = {
        runningShoesId: 1,
        distance: meters,
        time: seconds,
        averagePace: pace,
        courseUrl: 'some_url',
      };

      // API 요청 보내기
      const response = await apiClient.post('/runs', newData);

      if (response.status === 200 || response.status === 201) {
        console.log('러닝 데이터 저장 및 전송 성공');
      } else {
        console.error('데이터 전송 실패:', response.status);
      }

      setShowModal(false);
      resetNavigationStack(navigation, 'home');
    } catch (error) {
      console.error('러닝 데이터 전송 중 오류 발생:', error);
    }
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
        style={styles.gif}
        resizeMode='cover'
        source={{ uri: 'https://s3-alpha-sig.figma.com/img/77df/ebad/60125be4b2a5c55c9384140e360f0af6?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gk5puXi2jw5f66mg6Uvqb0rvcshDvH4A3ZLhBCQ5ktkB5KqGAnq3izjW5bwxB~lEDTmYzs3y8-7Q8iKGAfjd2gkQFz4YgBrNPJXUV8h~2ExlhENghvdBKMhoxbK2Oxn7s8fMaEhR8HyghH9wp5mD~vKpz27qC2Rs3O5ekdM~Jn~gpOCpqUmhx1ygEFXos3~DjKJL7N10Kb1Kb2RkyScIiNQwbYhht9MLHoTr~iCdJr5R63N~AEWyJniYgDB6HGz6agFWUmfy~nW~V48fTU~V9YgK0w9EvgSXsaIGg9VJXZB4DZRcmsf6wgusGKNCeT4klDjLn5hK3GWBo-6O3T9Y~A__' }}
      />

      <Image
        style={styles.imageStyle}
        source={require('@/assets/images/trophy.png')}
      />

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
  gif: {
    top: getSize(118),
    right: getSize(-9),
    width: getSize(127),
    height: getSize(127),
    position: "absolute"
  },
});

export default FinishScreen;
