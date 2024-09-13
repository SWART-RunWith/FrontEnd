import React, { useState, useEffect, useRef } from 'react';
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
} from '@/components/modal/ProfileUpdateDataModal';
import { CameraModal } from '@/components/modal/CameraModal';
import {
  DistanceBox,
  RunningShoesBox,
  PaceBox,
  TimeBox,
} from '@/components/box/ProfileBox';
import {
  ProfileSaveButton,
  ProfileUpdateButton,
} from '@/components/button/Button';
import { HomeScreenNavigationProp } from '@/scripts/navigation';
import getSize from '@/scripts/getSize';
import CameraIcon from '@/assets/icons/camera.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';


const DefaultImage = require('@/assets/images/default.png');

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const scrollRef = useRef<ScrollView>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);
  const [name, setName] = useState('홍여준');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isDescriptionModalVisible, setDescriptionModalVisible] = useState(false);

  // distance
  const [distance, setDistance] = useState('42.40KM');
  const [distanceShoes, setDistanceShoes] = useState('');
  const [distanceMemo, setDistanceMemo] = useState('');

  // pace
  const [pace, setPace] = useState("4'07\"");
  const [paceShoes, setPaceShoes] = useState('');
  const [paceMemo, setPaceMemo] = useState('');

  // time
  const [time, setTime] = useState('03:46:29');
  const [timeShoes, setTimeShoes] = useState('');
  const [timeMemo, setTimeMemo] = useState('');

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

  const saveProfile = () => {
    // to do : 프로필 update api 연결
    setIsEditMode(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  const updateProfile = () => {
    setIsEditMode(true);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      ref={scrollRef}
    >
      <ProfileHeader
        showBackIcon={isEditMode}
        backProps={{ onPress: () => saveProfile() }}
        editProps={{ onPress: () => updateProfile() }}
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

        {/* 프로필 정보 */}
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => isEditMode && setLocationModalVisible(true)}
            style={styles.locationContainer}
            disabled={!isEditMode}
          >
            <LocationIcon width={getSize(13)} height={getSize(18)} fill={Colors.main} />
            <Text style={styles.locationText}>
              {location ? location : '나의 위치를 추가해보세요'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => isEditMode && setNameModalVisible(true)}
            disabled={!isEditMode}
          >
            <Text style={styles.nameInput}>{name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => isEditMode && setDescriptionModalVisible(true)}
            disabled={!isEditMode}
          >
            <Text style={styles.descriptionInput}>
              {description ? description : '소개를 입력해주세요'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bar} />

        {/* 최고 기록 */}
        <View style={styles.myBestContainer}>
          <Text style={styles.myBestText}>MY BEST</Text>
          <View style={styles.cardContainer}>
            <DistanceBox
              isEditMode={isEditMode}
              value={distance}
              shoes={distanceShoes}
              memo={distanceMemo}
              onConfirm={(newDistance, newShoes, newMemo) => {
                setDistance(newDistance);
                setDistanceShoes(newShoes);
                setDistanceMemo(newMemo);
              }}
            />
            <PaceBox
              isEditMode={isEditMode}
              value={pace}
              shoes={paceShoes}
              memo={paceMemo}
              onConfirm={(newPace, newShoes, newMemo) => {
                setPace(newPace);
                setPaceShoes(newShoes);
                setPaceMemo(newMemo);
              }}
            />
            <TimeBox
              isEditMode={isEditMode}
              value={time}
              shoes={timeShoes}
              memo={timeMemo}
              onConfirm={(newTime, newShoes, newMemo) => {
                setTime(newTime);
                setTimeShoes(newShoes);
                setTimeMemo(newMemo);
              }}
            />
          </View>
        </View>

        <View style={styles.shoesContainer}>
          <Text style={styles.shoesText}>러닝화</Text>
          <View style={styles.shoesBoxContainer}>
            {/* RunningShoesBox 컴포넌트 */}
            <RunningShoesBox
              isEditMode={isEditMode}
              brand="Adidas"
              model="Adizero Adios Pro 3"
              edition="동아마라톤 2024 Edition"
            />
          </View>
        </View>

        {isEditMode
          ? <ProfileSaveButton
            style={styles.buttonContainer}
            onPress={() => { saveProfile() }} />
          : <ProfileUpdateButton
            style={styles.buttonContainer}
            onPress={() => { updateProfile() }} />
        }

      </ImageBackground>

      {/* 모달창 */}
      <CameraModal
        isVisible={isCameraModalVisible}
        onCancel={() => setCameraModalVisible(false)}
        onImageSelect={handleImageSelect}
      />

      <NameUpdateModal
        isVisible={isNameModalVisible}
        onCancel={() => setNameModalVisible(false)}
        onConfirm={(newName) => {
          setName(newName);
          setNameModalVisible(false);
        }}
        value={name}
        onChangeText={setName}
      />

      <LocationUpdateModal
        isVisible={isLocationModalVisible}
        onCancel={() => setLocationModalVisible(false)}
        onConfirm={(newLocation) => {
          setLocation(newLocation);
          setLocationModalVisible(false);
        }}
        value={location}
        onChangeText={setLocation}
      />

      <DescriptionUpdateModal
        isVisible={isDescriptionModalVisible}
        onCancel={() => setDescriptionModalVisible(false)}
        onConfirm={(newDescription) => {
          setDescription(newDescription);
          setDescriptionModalVisible(false);
        }}
        value={description}
        onChangeText={setDescription}
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
  myBestText: {
    fontSize: getSize(Sizes.boxText),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
  },
  myBestContainer: {
    width: width - getSize(Sizes.formMargin) * 2,
    marginTop: getSize(171),
  },
  cardContainer: {
    width: '100%',
    marginTop: getSize(9.53),
    gap: getSize(24),
  },
  shoesContainer: {
    marginTop: getSize(48),
  },
  shoesText: {
    fontSize: getSize(Sizes.boxText),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
  },
  shoesBoxContainer: {
    marginTop: getSize(16),
  },
  buttonContainer: {
    marginTop: getSize(91),
  }
});

export default ProfileScreen;
