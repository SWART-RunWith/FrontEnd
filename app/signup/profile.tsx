import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { ProfileHeader } from '@/components/Header';
import { ProfileUpdateModal } from '@/components/modal/ProfileModal';
import { LoginScreenNavigationProp } from '@/scripts/navigation';
import getSize from '@/scripts/getSize';
import CameraIcon from '@/assets/icons/camera.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  // 프로필 이미지 선택 핸들러
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={Styles.container}>
      <ProfileHeader onPress={() => navigation.replace('signup/terms')} />

      {/* 프로필 컨테이너 */}
      {profileImage ? (
        <ImageBackground
          source={{ uri: profileImage }}
          style={styles.profileContainer}
        >
          <TouchableOpacity
            style={styles.cameraContainer}
            onPress={() => setCameraModalVisible(true)}
          >
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
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
                {location
                  ? location
                  : '나의 위치를 추가해보세요'
                }</Text>
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
                {description
                  ? description
                  : '소개를 입력해주세요'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => alert('프로필 설정 완료')}>
            <Text style={styles.buttonText}>RUNWITH!</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <LinearGradient colors={['rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.8)']} style={styles.profileContainer}>
          {/* 이미지 없을 때 */}
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={pickImage}>
              <CameraIcon width={getSize(77.14)} height={getSize(57.19)} />
            </TouchableOpacity>
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
                {location
                  ? location
                  : '나의 위치를 추가해보세요'
                }</Text>
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
                {description
                  ? description
                  : '소개를 입력해주세요'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}
            onPress={() => alert('프로필 설정 완료')}
          >
            <Text style={styles.buttonText}>RUNWITH!</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {/* 이름 변경 모달 */}
      <ProfileUpdateModal
        isVisible={isNameModalVisible}
        onCancel={() => setNameModalVisible(false)}
        onConfirm={() => {
          setName(tempValue);
          setNameModalVisible(false);
        }}
        title="이름 수정"
        value={tempValue}
        onChangeText={setTempValue}
        placeholder="이름을 입력해주세요"
      />

      {/* 위치 변경 모달 */}
      <ProfileUpdateModal
        isVisible={isLocationModalVisible}
        onCancel={() => setLocationModalVisible(false)}
        onConfirm={() => {
          setLocation(tempValue);
          setLocationModalVisible(false);
        }}
        title="위치 수정"
        value={tempValue}
        onChangeText={setTempValue}
        placeholder="위치를 입력해주세요"
      />

      {/* 소개 변경 모달 */}
      <ProfileUpdateModal
        isVisible={isDescriptionModalVisible}
        onCancel={() => setDescriptionModalVisible(false)}
        onConfirm={() => {
          setDescription(tempValue);
          setDescriptionModalVisible(false);
        }}
        title="소개 수정"
        value={tempValue}
        onChangeText={setTempValue}
        placeholder="소개를 입력해주세요"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: getSize(20),
    width: width,
    height: getSize(752),
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraContainer: {
    marginTop: getSize(232),
    alignItems: 'center',
  },
  textContainer: {
    marginTop: getSize(151),
    paddingHorizontal: getSize(Sizes.formMargin),
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
  button: {
    marginTop: getSize(40),
    backgroundColor: '#ADFF2F',
    paddingVertical: getSize(15),
    paddingHorizontal: getSize(80),
    borderRadius: getSize(10),
  },
  buttonText: {
    color: 'black',
    fontSize: getSize(18),
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
