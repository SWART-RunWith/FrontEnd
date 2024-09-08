import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const widthRatio = width / 390;
const heightRatio = height / 844;

const getSize = (size: number) => {
  return Math.round(size * Math.min(widthRatio, heightRatio));
};

export default getSize;
