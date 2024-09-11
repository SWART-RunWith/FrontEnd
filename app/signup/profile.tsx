import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { ProfileHeader } from '@/components/Header';
import {
  NameUpdateModal,
  LocationUpdateModal,
  DescriptionUpdateModal,
} from '@/components/modal/ProfileModal';
import { CameraModal } from '@/components/modal/CameraModal';
import { LoginScreenNavigationProp } from '@/scripts/navigation';
import getSize from '@/scripts/getSize';
import CameraIcon from '@/assets/icons/camera.svg';
import LocationIcon from '@/assets/icons/location.svg';
import DefaultImage from '@/assets/images/default.png';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';
import { DefaultButton } from '@/components/button/Button';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);
  const [name, setName] = useState('홍여준');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isDescriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState('');

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

  // 프로필 이미지 선택 후 설정
  const handleImageSelect = (uri: string) => {
    setProfileImage(uri);
  };

  return (
    <View style={Styles.container}>
      <ProfileHeader onPress={() => navigation.replace('signup/terms')} />

      {/* 프로필 이미지가 있는지 여부에 따라 처리 */}
      <ImageBackground
        source={profileImage ? { uri: profileImage } : DefaultImage}
        style={styles.profileContainer}
        imageStyle={styles.imageStyle}
      >
        {/* 그라데이션 레이어 */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.gradientOverlay}
        />

        {/* 카메라 아이콘 */}
        <View style={styles.cameraContainer}>
          {!profileImage && (
            <TouchableOpacity
              onPress={() => setCameraModalVisible(true)}>
              <CameraIcon width={getSize(77.14)} height={getSize(57.19)} />
            </TouchableOpacity>
          )}
        </View>

        {/* 텍스트와 버튼들 */}
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
            }}>
            <Text style={styles.nameInput}>{name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTempValue(description);
              setDescriptionModalVisible(true);
            }}>
            <Text style={styles.descriptionInput}>
              {description ? description : '소개를 입력해주세요'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 버튼 */}
        <View style={styles.buttonContainer}>
          <DefaultButton
            onPress={() => navigation.replace('home')}
            text='RUNWITH!'
            fontFamily='Hanson'
          />
        </View>

        {/* 하단 바 */}
        <View style={styles.bar} />
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
    </View >
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: getSize(20),
    width: width,
    height: getSize(752),
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
  },
  imageStyle: {
    opacity: 1,
    zIndex: 1, // 이미지가 가장 뒤에 위치
  },
  cameraContainer: {
    marginTop: getSize(232),
    alignItems: 'center',
    zIndex: 3, // 카메라 아이콘이 그라데이션과 이미지 위에 위치
  },
  textContainer: {
    marginTop: getSize(151),
    paddingHorizontal: getSize(Sizes.formMargin),
    width: width,
    zIndex: 3, // 텍스트가 그라데이션과 이미지 위에 위치
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
  },
  bar: {
    backgroundColor: Colors.main,
    marginTop: getSize(97),
    height: getSize(3),
    width: width - getSize(Sizes.formMargin) * 2,
    zIndex: 3, // 바가 그라데이션 위에 위치
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getSize(92),
    zIndex: 3, // 버튼이 그라데이션 위에 위치
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: getSize(200),
    zIndex: 2, // 그라데이션이 이미지 위, 다른 요소 아래에 위치
  },
});

export default ProfileScreen;
