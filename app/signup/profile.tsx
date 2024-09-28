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

import { ProfileSettingHeader } from '@/components/header/IconHeader';
import {
  NameUpdateModal,
  LocationUpdateModal,
  DescriptionUpdateModal,
} from '@/components/modal/ProfileUpdateDataModal';
import { CameraModal } from '@/components/modal/CameraModal';
import { SignUpScreenNavigationProp } from '@/scripts/navigation';
import getSize from '@/scripts/getSize';
import CameraIcon from '@/assets/icons/camera.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';
import { DefaultButton } from '@/components/button/Button';
import { resetNavigationStack } from '@/scripts/resetNavigationStack';

const DefaultImage = require('@/assets/images/default.png');
const { width, height } = Dimensions.get('window');

const SignUpProfileScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

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

  const handleImageSelect = (uri: string) => {
    setProfileImage(uri);
  };

  return (
    <View style={Styles.container}>
      <ProfileSettingHeader
        onPressBack={() => navigation.navigate('signup/terms')}
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
          {!profileImage && (
            <TouchableOpacity
              style={{
                marginTop: getSize(232),
              }}
              onPress={() => setCameraModalVisible(true)}>
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
            onPress={() => {
              resetNavigationStack(navigation, 'home');
            }}
            text='RUNWITH!'
            fontFamily='Hanson'
          />
        </View>

        <View style={styles.bar} />
      </ImageBackground>

      <CameraModal
        isVisible={isCameraModalVisible}
        onCancel={() => setCameraModalVisible(false)}
        onImageSelect={handleImageSelect}
      />

      <NameUpdateModal
        isVisible={isNameModalVisible}
        onCancel={() => setNameModalVisible(false)}
        onConfirm={(tempValue) => {
          setName(tempValue);
          setNameModalVisible(false);
        }}
        value={name}
        onChangeText={setName}
      />

      <LocationUpdateModal
        isVisible={isLocationModalVisible}
        onCancel={() => setLocationModalVisible(false)}
        onConfirm={(tempValue) => {
          setLocation(tempValue);
          setLocationModalVisible(false);
        }}
        value={location}
        onChangeText={setLocation}
      />

      <DescriptionUpdateModal
        isVisible={isDescriptionModalVisible}
        onCancel={() => setDescriptionModalVisible(false)}
        onConfirm={(tempValue) => {
          setDescription(tempValue);
          setDescriptionModalVisible(false);
        }}
        value={description}
        onChangeText={setDescription}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: getSize(20),
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
  },
  imageStyle: {
    opacity: 1,
    zIndex: 1,
  },
  cameraContainer: {
    height: getSize(440),
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
  },
  bar: {
    backgroundColor: Colors.main,
    marginTop: getSize(97),
    height: getSize(3),
    width: width - getSize(Sizes.formMargin) * 2,
    zIndex: 3,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getSize(92),
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
});

export default SignUpProfileScreen;
