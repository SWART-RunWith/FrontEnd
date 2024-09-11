import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import Styles from '@/constants/Styles';
import { TermsAgreeHeader } from '@/components/header/IconHeader';
import RightArrowIcon from '@/assets/icons/rightArrow.svg';
import { DefaultButton } from '@/components/button/Button'; // DefaultButton을 사용
import { SignUpScreenNavigationProp } from '@/scripts/navigation';

const { width } = Dimensions.get('window');

// 약관 항목 리스트
const termsData = [
  { id: '1', title: '서비스 이용 약관', required: true },
  { id: '2', title: '개인정보수집/이용 동의', required: true },
  { id: '3', title: '개인정보 제 3자 정보제공 동의', required: true },
  { id: '4', title: '위치기반 서비스 이용약관 동의', required: true },
  { id: '5', title: '이메일 및 SMS 광고성 정보 수신동의', required: false },
];

const TermsScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // 필수 항목 id
  const requiredTerms = termsData
    .filter((term) => term.required)
    .map((term) => term.id);

  const toggleAllChecked = () => {
    if (allChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(termsData.map((item) => item.id));
    }
    setAllChecked(!allChecked);
  };

  const toggleItemChecked = (id: string) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((itemId) => itemId !== id)
        : [...prevCheckedItems, id]
    );
  };

  useEffect(() => {
    // 필수 항목 모두 선택 -> allChecked = true
    const allRequiredChecked = requiredTerms.every((id) => checkedItems.includes(id));
    setAllChecked(allRequiredChecked && checkedItems.length === termsData.length);
  }, [checkedItems]);

  const isAllRequiredChecked = requiredTerms.every((id) => checkedItems.includes(id));

  return (
    <View style={Styles.container}>
      <TermsAgreeHeader onPressBack={() => { navigation.replace('login') }} />

      <View style={styles.textContainer}>
        <Text style={styles.headerText}>약관 동의</Text>
        <Text style={styles.subText}>필수항목 및 선택항목 약관에 동의해 주세요.</Text>
      </View>

      <View style={styles.termContainer}>
        {/* 전체 동의 */}
        <TouchableOpacity
          style={styles.termAllAgree}
          onPress={toggleAllChecked}
        >
          <Ionicons
            name={allChecked
              ? 'checkmark-circle'
              : 'checkmark-circle-outline'}
            size={getSize(20)}
            color={allChecked ? Colors.main : '#AFAFAF'}
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
              <View style={styles.termItemContainer}>
                <Ionicons
                  name={checkedItems.includes(item.id)
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'}
                  size={getSize(20)}
                  color={checkedItems.includes(item.id) ? Colors.main : '#AFAFAF'}
                />
                <View style={styles.requiredBox}>
                  <Text style={styles.requiredTag}>{item.required ? '필수' : '선택'}</Text>
                </View>
                <Text style={styles.termText}>{item.title}</Text>
              </View>
              <View style={styles.rightIcon}>
                <RightArrowIcon width={getSize(10)} height={getSize(18)} color={'white'} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 필수 항목 모두 체크 -> 시작하기 버튼 표시 */}
      {isAllRequiredChecked && (
        <View style={styles.buttonContainer}>
          <DefaultButton
            text="시작하기"
            onPress={() => navigation.replace('signup/signup')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: width,
    paddingHorizontal: getSize(Sizes.formMargin),
  },
  headerText: {
    fontSize: getSize(30),
    fontFamily: 'Pretendard-ExtraBold',
    color: Colors.main,
    marginTop: getSize(31),
  },
  subText: {
    fontSize: getSize(12),
    fontFamily: 'Pretendard-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: getSize(10),
  },
  termContainer: {
    marginTop: getSize(30),
  },
  termAllAgree: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayBox,
    borderRadius: getSize(10),
    width: width - getSize(Sizes.formMargin * 2),
    height: getSize(56),
    paddingHorizontal: getSize(20),
    marginBottom: getSize(12),
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: getSize(10),
    width: width - getSize(Sizes.formMargin * 2),
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(12),
  },
  termItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - getSize(70),
  },
  requiredBox: {
    width: getSize(39),
    height: getSize(24),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: getSize(20),
    borderStyle: 'solid',
    borderColor: Colors.grayBox,
    marginLeft: getSize(13),
  },
  requiredTag: {
    fontSize: getSize(12),
    fontFamily: 'Pretendard-Medium',
    color: 'white'
  },
  termText: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Medium',
    color: 'white',
    marginLeft: getSize(8),
  },
  allAgreeText: {
    fontSize: getSize(16),
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    marginLeft: getSize(10),
  },
  rightIcon: {
    right: getSize(34 - 16),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: getSize(149),
  },
});

export default TermsScreen;
