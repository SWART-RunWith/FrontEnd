import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeScreenNavigationProp } from '@/scripts/navigation';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

const SettingScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = () => {
    // Handle logout functionality
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>설정</Text>

      <View style={styles.settingSection}>
        <Text style={styles.label}>이메일</Text>
        <Text style={styles.value}>tama0412@naver.com</Text>
      </View>

      <View style={styles.settingSection}>
        <Text style={styles.label}>전화 번호</Text>
        <Text style={styles.value}>+82 01 1234 5678</Text>
      </View>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('MyInfo')}>
        <Text style={styles.label}>내 정보</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('MeasurementUnit')}>
        <Text style={styles.label}>측정 단위</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.label}>알림</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('ProfileVisibility')}>
        <Text style={styles.label}>프로필 공개 범위</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.settingSection}>
        <Text style={styles.label}>국가/지역</Text>
        <Text style={styles.value}>대한민국</Text>
      </View>

      <View style={styles.settingSection}>
        <Text style={styles.label}>버전 정보</Text>
        <Text style={styles.value}>1.0 V</Text>
      </View>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.label}>개인정보 처리 방침</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('ContactUs')}>
        <Text style={styles.label}>문의하기</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingSection}
        onPress={() => navigation.navigate('DeleteAccount')}>
        <Text style={styles.label}>계정 탈퇴</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutSection}
        onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getSize(20),
    backgroundColor: '#400000', // Adjust the background color based on your image
    flexGrow: 1,
  },
  header: {
    fontSize: getSize(24),
    fontWeight: 'bold',
    color: '#FFD700', // Yellow color for header
    marginBottom: getSize(20),
    textAlign: 'center',
  },
  settingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)', // Slightly transparent white for borders
    paddingVertical: getSize(15),
  },
  label: {
    fontSize: getSize(16),
    color: '#FFFFFF',
  },
  value: {
    fontSize: getSize(16),
    color: '#FFFFFF',
    opacity: 0.8,
  },
  arrow: {
    fontSize: getSize(18),
    color: '#FFFFFF',
  },
  logoutSection: {
    marginTop: getSize(20),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: getSize(15),
  },
  logoutText: {
    fontSize: getSize(18),
    color: '#FF4500', // Red color for the logout button
    textAlign: 'center',
  },
});

export default SettingScreen;
