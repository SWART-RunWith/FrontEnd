import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface MyBestBoxProps {
  title?: string;
  value?: string;
  description?: string;
  additionalInfo?: string;
}

const MyBestBox: React.FC<MyBestBoxProps> = ({
  title,
  value,
  description,
  additionalInfo
}) => {
  return (
    <View style={styles.boxContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.additionalInfo}>{additionalInfo}</Text>
      </View>
    </View>
  );
};

const DistanceBox: React.FC<MyBestBoxProps> = ({
  title = '최장 거리',
  ...props
}) => {
  return (
    <MyBestBox title={title} {...props} />
  );
};

const PaceBox: React.FC<MyBestBoxProps> = ({
  title = '최고 페이스',
  ...props
}) => {
  return (
    <MyBestBox title={title} {...props} />
  );
};

const TimeBox: React.FC<MyBestBoxProps> = ({
  title = '최장 시간',
  ...props
}) => {
  return (
    <MyBestBox title={title} {...props} />
  );
};

export {
  DistanceBox,
  PaceBox,
  TimeBox,
};

const ShoesImage = require('@/assets/images/shoes.png'); // 이미지 경로를 실제 경로로 변경하세요

interface RunningShoesBoxProps {
  brand: string;
  model: string;
  edition: string;
}

const RunningShoesBox: React.FC<RunningShoesBoxProps> = ({
  brand,
  model,
  edition
}) => {
  return (
    <View style={styles.shoesContainer}>
      <Image
        source={ShoesImage}
        style={styles.shoesImage}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.model}>{model}</Text>
        <Text style={styles.edition}>{edition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    padding: getSize(20),
  },
  title: {
    fontSize: getSize(20),
    color: 'white',
    fontFamily: 'Pretendard-SemiBold',
  },
  descriptionContainer: {
    marginTop: getSize(18),
  },
  value: {
    fontSize: getSize(32),
    color: Colors.main,
    fontFamily: 'Pretendard-ExtraBold',
    marginTop: getSize(8),
  },
  description: {
    fontSize: getSize(16),
    color: 'white',
    fontFamily: 'Pretendard-Medium',
  },
  additionalInfo: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Light',
    marginTop: getSize(4),
  },
  shoesContainer: {
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: getSize(15),
    paddingLeft: getSize(18),
    paddingRight: getSize(21),
    paddingBottom: getSize(27),
  },
  shoesImage: {
    width: getSize(220),
    height: getSize(130),
  },
  textContainer: {
    width: '100%',
  },
  brand: {
    fontSize: getSize(20),
    color: Colors.main,
    fontFamily: 'Pretendard-Medium',
  },
  model: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Light',
    marginTop: getSize(4),
  },
  edition: {
    fontSize: getSize(14),
    color: 'white',
    fontFamily: 'Pretendard-Light',
    marginTop: getSize(10),
  },
});

export {
  RunningShoesBox
};
