import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import getSize from '@/scripts/getSize';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import EditIcon from '@/assets/icons/edit.svg';
import {
  DistanceUpdateModal,
  TimeUpdateModal,
  PaceUpdateModal,
  ShoesUpdateModal,
} from '@/components/modal/ProfileModal';

const { width } = Dimensions.get('window');

interface MyBestBoxProps {
  title?: string;
  value?: string;
  description?: string;
  additionalInfo?: string;
  onEditPress?: () => void;
  isEditMode?: boolean;
}

const MyBestBox: React.FC<MyBestBoxProps> = ({
  title,
  value,
  description,
  additionalInfo,
  onEditPress,
  isEditMode = false,
}) => {
  return (
    <View style={styles.recordBoxContainer}>
      {isEditMode && (
        <TouchableOpacity
          style={styles.recordEditIcon}
          onPress={onEditPress}
        >
          <EditIcon width={getSize(22.95)} height={getSize(23.06)} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text
        style={styles.value}
        numberOfLines={1}
      >{value}</Text>
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
  const [isDistanceModalVisible, setDistanceModalVisible] = useState(false);
  const [distance, setDistance] = useState(props.value);

  return (
    <View>
      <MyBestBox
        title={title}
        value={distance + 'KM'}
        onEditPress={() => setDistanceModalVisible(true)}
        {...props}
      />

      <DistanceUpdateModal
        isVisible={isDistanceModalVisible}
        onCancel={() => setDistanceModalVisible(false)}
        onConfirm={() => setDistanceModalVisible(false)}
        value={distance}
        onChangeText={setDistance}
      />
    </View>
  );
};

const PaceBox: React.FC<MyBestBoxProps> = ({
  title = '최고 페이스',
  ...props
}) => {
  const [isPaceModalVisible, setPaceModalVisible] = useState(false);
  const [pace, setPace] = useState(props.value);

  return (
    <View>
      <MyBestBox
        title={title}
        value={pace}
        onEditPress={() => setPaceModalVisible(true)}
        {...props}
      />

      <PaceUpdateModal
        isVisible={isPaceModalVisible}
        onCancel={() => setPaceModalVisible(false)}
        onConfirm={() => setPaceModalVisible(false)}
        value={pace}
        onChangeText={setPace}
      />
    </View>
  );
};

const TimeBox: React.FC<MyBestBoxProps> = ({
  title = '최장 시간',
  ...props
}) => {
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [time, setTime] = useState(props.value);

  return (
    <View>
      <MyBestBox
        title={title}
        value={time}
        onEditPress={() => setTimeModalVisible(true)}
        {...props}
      />

      <TimeUpdateModal
        isVisible={isTimeModalVisible}
        onCancel={() => setTimeModalVisible(false)}
        onConfirm={() => setTimeModalVisible(false)}
        value={time}
        onChangeText={setTime}
      />
    </View>
  );
};

export { DistanceBox, PaceBox, TimeBox };

const ShoesImage = require('@/assets/images/shoes.png');

interface RunningShoesBoxProps {
  brand: string;
  model: string;
  edition: string;
  onEditPress?: () => void;
  isEditMode?: boolean;
}

const RunningShoesBox: React.FC<RunningShoesBoxProps> = ({
  brand,
  model,
  edition,
  isEditMode = false
}) => {
  const [isShoeModalVisible, setShoeModalVisible] = useState(false);
  const [shoeInfo, setShoeInfo] = useState(`${brand} ${model}`);

  return (
    <View style={styles.shoesContainer}>
      {isEditMode && (
        <TouchableOpacity
          style={styles.shoesEditIcon}
          onPress={() => setShoeModalVisible(true)}
        >
          <EditIcon width={getSize(22.95)} height={getSize(23.06)} />
        </TouchableOpacity>
      )}
      <Image source={ShoesImage} style={styles.shoesImage} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.model}>{model}</Text>
        <Text style={styles.edition}>{edition}</Text>
      </View>

      <ShoesUpdateModal
        isVisible={isShoeModalVisible}
        onCancel={() => setShoeModalVisible(false)}
        onConfirm={() => setShoeModalVisible(false)}
        value={shoeInfo}
        onChangeText={setShoeInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recordBoxContainer: {
    backgroundColor: Colors.grayBox,
    borderRadius: 10,
    padding: getSize(20),
    position: 'relative',
  },
  recordEditIcon: {
    position: 'absolute',
    right: getSize(20),
    top: getSize(20),
    zIndex: 10,
    width: getSize(40),
    height: getSize(40),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
    width: getSize(291),
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
    width: width - getSize(Sizes.formMargin) * 2,
    position: 'relative',
  },
  shoesImage: {
    width: getSize(220),
    height: getSize(130),
    resizeMode: 'contain',
  },
  shoesEditIcon: {
    position: 'absolute',
    right: getSize(21),
    top: getSize(15),
  },
  textContainer: {
    width: '100%',
    marginTop: getSize(6),
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

export { RunningShoesBox };
