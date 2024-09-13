import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeScreenNavigationProp } from '@/scripts/navigation';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import { SettingHeader } from '@/components/header/IconHeader';
import Sizes from '@/constants/Sizes';
import RightArrowIcon from '@/assets/icons/rightArrow.svg';

const { width } = Dimensions.get('window');

const SettingScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = () => {
    // Handle logout functionality
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SettingHeader />

      <View style={styles.textContainer}>
        <Text style={styles.label}>이메일</Text>
        <Text style={styles.value}>tama0412@naver.com</Text>
      </View>

      <View style={styles.bar} />

      <View style={styles.textContainer}>
        <Text style={styles.label}>전화 번호</Text>
        <Text style={styles.value}>+82 01 1234 5678</Text>
      </View>

      <View style={styles.bar} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('MyInfo')}>
        <Text style={styles.label}>내 정보</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.bar} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('MeasurementUnit')}>
        <Text style={styles.label}>측정 단위</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.box} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.label}>알림</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.bar} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('ProfileVisibility')}>
        <Text style={styles.label}>프로필 공개 범위</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.box} />

      <View style={styles.textContainer}>
        <Text style={styles.label}>국가/지역</Text>
        <Text style={styles.value}>대한민국</Text>
      </View>

      <View style={styles.bar} />

      <View style={styles.textContainer}>
        <Text style={styles.label}>버전 정보</Text>
        <Text style={styles.value}>1.0 V</Text>
      </View>

      <View style={styles.bar} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.label}>개인정보 처리 방침</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.bar} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('ContactUs')}>
        <Text style={styles.label}>문의하기</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.box} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('DeleteAccount')}>
        <Text style={styles.label}>계정 탈퇴</Text>
        <RightArrowIcon width={getSize(8)} height={getSize(14)} />
      </TouchableOpacity>

      <View style={styles.box} />

      <TouchableOpacity
        style={styles.textContainer}
        onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>

      <View style={styles.bottomBox} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    width: width,
    height: getSize(1058),
    alignItems: 'center',
  },
  bar: {
    backgroundColor: Colors.gray,
    width: width,
    height: getSize(0.5),
  },
  box: {
    backgroundColor: Colors.lightGrayBox,
    height: getSize(54),
    width: width,
  },
  textContainer: {
    width: width,
    height: getSize(54),
    paddingHorizontal: getSize(Sizes.formMargin),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Light',
    color: 'white',
  },
  value: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Light',
    color: 'white',
  },
  logoutText: {
    fontSize: getSize(18),
    color: '#FF0000',
    textAlign: 'center',
  },
  bottomBox: {
    backgroundColor: Colors.lightGrayBox,
    height: getSize(150),
    width: width,
  },
});

export default SettingScreen;
