import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

const { width } = Dimensions.get('window');

// 약관 항목 리스트
const termsData = [
  { id: '1', title: '서비스 이용 약관', required: true },
  { id: '2', title: '개인정보수집/이용 동의', required: true },
  { id: '3', title: '개인정보 제 3자 정보제공 동의', required: true },
  { id: '4', title: '위치기반 서비스 이용약관 동의', required: true },
];

const TermsScreen: React.FC = () => {
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 상태
  const [checkedItems, setCheckedItems] = useState<string[]>([]); // 선택된 항목 ID 리스트

  // 전체 동의 상태 변경
  const toggleAllChecked = () => {
    if (allChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(termsData.map((item) => item.id));
    }
    setAllChecked(!allChecked);
  };

  // 개별 항목 선택 상태 변경
  const toggleItemChecked = (id: string) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((itemId) => itemId !== id)
        : [...prevCheckedItems, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>약관 동의</Text>
      <Text style={styles.subText}>필수항목 및 선택항목 약관에 동의해 주세요.</Text>

      {/* 전체 동의 */}
      <TouchableOpacity
        style={styles.termItem}
        onPress={toggleAllChecked}
      >
        <Ionicons
          name={allChecked ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={allChecked ? Colors.main : 'white'}
        />
        <Text style={styles.allAgreeText}>전체 동의</Text>
      </TouchableOpacity>

      {/* 개별 약관 항목 */}
      <FlatList
        data={termsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.termItem}
            onPress={() => toggleItemChecked(item.id)}
          >
            <View style={styles.leftSection}>
              <Ionicons
                name={checkedItems.includes(item.id) ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={checkedItems.includes(item.id) ? Colors.main : 'white'}
              />
              {item.required && (
                <Text style={styles.requiredTag}>필수</Text>
              )}
              <Text style={styles.termText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  headerText: {
    fontSize: getSize(24),
    fontFamily: 'Pretendard-Bold',
    color: Colors.main,
    marginTop: getSize(32),
    marginBottom: getSize(12),
  },
  subText: {
    fontSize: getSize(14),
    fontFamily: 'Pretendard-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: getSize(24),
  },
  termItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
    borderRadius: getSize(10),
    paddingHorizontal: getSize(18),
    paddingVertical: getSize(16),
    marginBottom: getSize(12),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredTag: {
    fontSize: getSize(12),
    fontFamily: 'Pretendard-SemiBold',
    color: Colors.main,
    marginLeft: getSize(10),
    marginRight: getSize(10),
  },
  termText: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Medium',
    color: 'white',
  },
  allAgreeText: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-SemiBold',
    color: 'white',
    marginLeft: getSize(10),
  },
});

export default TermsScreen;
