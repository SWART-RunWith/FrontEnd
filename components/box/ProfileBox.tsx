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
} from '@/components/modal/RecordUpdateModal';
import { ShoesUpdateModal } from '@/components/modal/ShoesUpdateModal';

const { width } = Dimensions.get('window');

interface MyBestBoxProps {
  title?: string;
  value?: string;
  shoes?: string;
  memo?: string;
  onEditPress?: () => void;
  isEditMode?: boolean;
  onConfirm?: (
    newDistance: string,
    newShoes: string,
    newMemo: string,
  ) => void;
}

const MyBestBox: React.FC<MyBestBoxProps> = ({
  title,
  value,
  shoes,
  memo,
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
        <Text style={styles.shoes}>{shoes}</Text>
        <Text style={styles.memo}>{memo}</Text>
      </View>
    </View>
  );
};

const DistanceBox: React.FC<MyBestBoxProps> = ({
  title = '최장 거리',
  onConfirm,
  ...props
}) => {
  const [isDistanceModalVisible, setDistanceModalVisible] = useState(false);
  const [distance, setDistance] = useState(props.value || '');
  const [shoes, setShoes] = useState(props.shoes || '');
  const [memo, setMemo] = useState(props.memo || '');

  return (
    <View>
      <MyBestBox
        title={title}
        value={distance}
        shoes={shoes}
        memo={memo}
        onEditPress={() => setDistanceModalVisible(true)}
        {...props}
      />
      <DistanceUpdateModal
        isVisible={isDistanceModalVisible}
        onCancel={() => setDistanceModalVisible(false)}
        onConfirm={(newDistance, newShoes, newMemo) => {
          onConfirm?.(newDistance, newShoes, newMemo);
          setDistanceModalVisible(false);
        }}
        value={distance}
        shoesValue={shoes}
        memoValue={memo}
        onChangeText={setDistance}
        onChangeShoes={setShoes}
        onChangeMemo={setMemo}
      />
    </View>
  );
};


const PaceBox: React.FC<MyBestBoxProps> = ({
  title = '최고 페이스',
  onConfirm,
  ...props
}) => {
  const [isPaceModalVisible, setPaceModalVisible] = useState(false);
  const [pace, setPace] = useState(props.value);
  const [shoes, setShoes] = useState(props.shoes);
  const [memo, setMemo] = useState(props.memo);

  return (
    <View>
      <MyBestBox
        title={title}
        value={pace}
        shoes={shoes}
        memo={memo}
        onEditPress={() => setPaceModalVisible(true)}
        {...props}
      />
      <PaceUpdateModal
        isVisible={isPaceModalVisible}
        onCancel={() => setPaceModalVisible(false)}
        onConfirm={(newPace, newShoes, newMemo) => {
          onConfirm?.(newPace, newShoes, newMemo);
          setPaceModalVisible(false);
        }}
        value={pace}
        shoesValue={shoes}
        memoValue={memo}
        onChangeText={setPace}
        onChangeShoes={setShoes}
        onChangeMemo={setMemo}
      />
    </View>
  );
};

const TimeBox: React.FC<MyBestBoxProps> = ({
  title = '최장 시간',
  onConfirm,
  ...props
}) => {
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [time, setTime] = useState(props.value);
  const [shoes, setShoes] = useState(props.shoes);
  const [memo, setMemo] = useState(props.memo);

  return (
    <View>
      <MyBestBox
        title={title}
        value={time}
        shoes={shoes}
        memo={memo}
        onEditPress={() => setTimeModalVisible(true)}
        {...props}
      />
      <TimeUpdateModal
        isVisible={isTimeModalVisible}
        onCancel={() => setTimeModalVisible(false)}
        onConfirm={(newTime, newShoes, newMemo) => {
          onConfirm?.(newTime, newShoes, newMemo);
          setTimeModalVisible(false);
        }}
        value={time}
        shoesValue={shoes}
        memoValue={memo}
        onChangeText={setTime}
        onChangeShoes={setShoes}
        onChangeMemo={setMemo}
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
  memo?: string;
  onEditPress?: () => void;
  isEditMode?: boolean;
  onConfirm?: (
    newBrand: string,
    newModel: string,
    newEdition: string,
    newMemo: string,
  ) => void;
}

const RunningShoesBox: React.FC<RunningShoesBoxProps> = ({
  isEditMode = false,
  ...props
}) => {
  const [isShoeModalVisible, setShoeModalVisible] = useState(false);
  const [brand, setBrand] = useState(props.brand || '');
  const [model, setModel] = useState(props.model || '');
  const [edition, setEdition] = useState(props.edition || '');
  const [memo, setMemo] = useState(props.memo || '');

  const handleConfirm = (
    newBrand: string,
    newModel: string,
    newEdition: string,
    newMemo: string
  ) => {
    setBrand(newBrand);
    setModel(newModel);
    setEdition(newEdition);
    setMemo(newMemo);
    setShoeModalVisible(false);
  };

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
        <Text style={styles.model}>{`${model} ${edition}`}</Text>
        <Text style={styles.memo}>{memo}</Text>
      </View>

      <ShoesUpdateModal
        isVisible={isShoeModalVisible}
        onCancel={() => setShoeModalVisible(false)}
        onConfirm={handleConfirm}
        brandValue={brand}
        modelValue={model}
        editionValue={edition}
        memoValue={memo}
        onChangeBrand={setBrand}
        onChangeModel={setModel}
        onChangeEdition={setEdition}
        onChangeMemo={setMemo}
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
  shoes: {
    fontSize: getSize(16),
    color: 'white',
    fontFamily: 'Pretendard-Medium',
  },
  memo: {
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
