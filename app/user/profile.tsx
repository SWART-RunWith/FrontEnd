import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { ProfileHeader } from '@/components/header/IconHeader';
import {
  NameUpdateModal,
  LocationUpdateModal,
  DescriptionUpdateModal,
} from '@/components/modal/ProfileModal';
import { CameraModal } from '@/components/modal/CameraModal';
import {
  DistanceBox,
  RunningShoesBox,
  PaceBox,
  TimeBox,
} from '@/components/box/profile/ProfileBox';
import { LoginScreenNavigationProp } from '@/scripts/navigation';
import getSize from '@/scripts/getSize';
import CameraIcon from '@/assets/icons/camera.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';

const DefaultImage = require('@/assets/images/default.png');
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // 수정 모드
  const [isEditMode, setIsEditMode] = useState(false);

  // 프로필 기본 정보
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);
  const [name, setName] = useState('홍여준');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // 모달 상태 변수
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isDescriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState('');

  // Best 기록 상태 관리
  const [distance, setDistance] = useState('42.40KM');
  const [pace, setPace] = useState("4'07\"");
  const [time, setTime] = useState('03:46:29');
  const [shoeInfo, setShoeInfo] = useState('Adidas Adizero Adios Pro 3');

  // 권한 요청
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('사진첩에 접근할 수 없습니다. 권한이 필요합니다.');
      return;
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleImageSelect = (uri: string) => {
    setProfileImage(uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <ProfileHeader
        showBackIcon={isEditMode}
        backProps={{
          onPress: () => navigation.replace('signup/terms')
        }}
      />

      <ImageBackground
        source={profileImage ? { uri: profileImage } : DefaultImage}
        style={styles.profileContainer}
        imageStyle={styles.imageStyle}
      >
        {/* 그라데이션 */}
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradientOverlay}
        />

        {/* 카메라 아이콘 */}
        <View style={styles.cameraContainer}>
          {isEditMode && (
            <TouchableOpacity
              style={{
                marginTop: getSize(348),
              }}
              onPress={() => setCameraModalVisible(true)}
            >
              <CameraIcon width={getSize(77.14)} height={getSize(57.19)} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => {
              setTempValue(location);
              setLocationModalVisible(true);
            }}
            style={styles.locationContainer}
          >
            <LocationIcon width={getSize(13)} height={getSize(18)} fill={Colors.main} />
            <Text style={styles.locationText}>
              {location ? location : '나의 위치를 추가해보세요'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTempValue(name);
              setNameModalVisible(true);
            }}
          >
            <Text style={styles.nameInput}>{name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTempValue(description);
              setDescriptionModalVisible(true);
            }}
          >
            <Text style={styles.descriptionInput}>
              {description ? description : '소개를 입력해주세요'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bar} />

        <View style={styles.myBestContainer}>
          <Text
            style={{
              fontSize: getSize(Sizes.boxText),
              color: 'white',
              fontFamily: 'Pretendard-SemiBold',
            }}
          >
            MY BEST
          </Text>
          <View style={styles.CardContainer}>
            {/* Best 기록을 보여주는 컴포넌트 */}
            <DistanceBox
              value={distance}
              description="Adidas Adizero Adios Pro"
              additionalInfo="동아마라톤 2024 Edition"
            />
            <PaceBox
              value={pace}
              description="Adidas Adizero Takumi Sen 10"
              additionalInfo="Green Spark / Aurora Met. / Lucid Lemon"
            />
            <TimeBox
              value={time}
              description="Asics Metaspeed Sky"
              additionalInfo="Paris Edition"
            />
          </View>
        </View>

        <View style={styles.runningShoesContainer}>
          <Text
            style={{
              fontSize: getSize(Sizes.boxText),
              color: 'white',
              fontFamily: 'Pretendard-SemiBold',
            }}
          >
            러닝화
          </Text>
          <View style={styles.runningShoesBoxContainer}>
            {/* RunningShoesBox 컴포넌트 */}
            <RunningShoesBox
              brand="Adidas"
              model="Adizero Adios Pro 3"
              edition="동아마라톤 2024 Edition"
            />
          </View>
        </View>
      </ImageBackground>

      {/* 카메라 모달 */}
      <CameraModal
        isVisible={isCameraModalVisible}
        onCancel={() => setCameraModalVisible(false)}
        onImageSelect={handleImageSelect}
      />

      {/* 이름 변경 모달 */}
      <NameUpdateModal
        isVisible={isNameModalVisible}
        onCancel={() => setNameModalVisible(false)}
        onConfirm={() => {
          setName(tempValue);
          setNameModalVisible(false);
        }}
        value={tempValue}
        onChangeText={setTempValue}
      />

      {/* 위치 변경 모달 */}
      <LocationUpdateModal
        isVisible={isLocationModalVisible}
        onCancel={() => setLocationModalVisible(false)}
        onConfirm={() => {
          setLocation(tempValue);
          setLocationModalVisible(false);
        }}
        value={tempValue}
        onChangeText={setTempValue}
      />

      {/* 소개 변경 모달 */}
      <DescriptionUpdateModal
        isVisible={isDescriptionModalVisible}
        onCancel={() => setDescriptionModalVisible(false)}
        onConfirm={() => {
          setDescription(tempValue);
          setDescriptionModalVisible(false);
        }}
        value={tempValue}
        onChangeText={setTempValue}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: 'black',
    width: width,
    height: getSize(2086),
    alignItems: 'center',
  },
  profileContainer: {
    position: 'absolute',
    width: width,
    height: getSize(760),
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
    zIndex: 2,
  },
  imageStyle: {
    opacity: 1,
    zIndex: 1,
  },
  cameraContainer: {
    height: getSize(609),
    alignItems: 'center',
    zIndex: 3,
  },
  textContainer: {
    paddingHorizontal: getSize(Sizes.formMargin),
    width: width,
    zIndex: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: getSize(20),
  },
  locationText: {
    marginLeft: getSize(6),
    color: 'white',
    fontSize: getSize(16),
  },
  nameInput: {
    fontSize: getSize(48),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
    marginTop: getSize(10),
  },
  descriptionInput: {
    fontSize: getSize(16),
    color: 'white',
    marginTop: getSize(28),
    height: getSize(39),
  },
  bar: {
    backgroundColor: Colors.main,
    marginTop: getSize(12),
    height: getSize(3),
    width: width - getSize(Sizes.formMargin) * 2,
    zIndex: 3,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: getSize(479),
    zIndex: 2,
  },
  myBestContainer: {
    width: width - getSize(Sizes.formMargin) * 2,
    marginTop: getSize(171),
  },
  CardContainer: {
    width: '100%',
    marginTop: getSize(9.53),
    gap: getSize(24),
  },
  runningShoesContainer: {
    marginTop: getSize(48),
  },
  runningShoesBoxContainer: {},
});

export default ProfileScreen;
