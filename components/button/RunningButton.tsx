import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

interface RunningButtonProps {
  onPress: () => void;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  style?: object;
  color?: string;
  width?: number;
  height?: number;
  radius?: number;
  isEnd?: boolean;
  disabled?: boolean;
  svg?: JSX.Element;
}

const RunningButton = ({
  onPress,
  text = '',
  fontSize = 18,
  fontFamily = 'Pretendard-ExtraBold',
  fontColor = '#000',
  style = {},
  color = Colors.main,
  width = 80,
  height = 80,
  radius = 100,
  isEnd = false,
  disabled = false,
  svg
}: RunningButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: getSize(width),
        height: getSize(height),
        borderRadius: radius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isEnd ? 'black' : Colors.main,
        ...style,
      }}
    >
      {svg ? (svg) : (
        <Text style={{
          fontSize: getSize(fontSize),
          fontFamily,
          color: fontColor,
        }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const StartButton = ({
  text = 'START',
  ...props
}: RunningButtonProps) => {
  return <RunningButton {...props} text={text} />;
};

const PlayButton = ({
  svg = (
    <Svg width={getSize(24)} height={getSize(28)} viewBox="0 0 22 28" fill="none">
      <Path d="M0 0V28L22 14L0 0Z" fill="black" />
    </Svg>
  ),
  ...props
}: RunningButtonProps) => {
  return <RunningButton {...props} svg={svg} />;
};

const EndButton = ({
  isEnd = true,
  svg = (
    <Svg width={getSize(20)} height={getSize(20)} viewBox="0 0 28 28" fill="none">
      <Rect width={getSize(28)} height={getSize(28)} fill={Colors.main} />
    </Svg>
  ),
  ...props
}: RunningButtonProps) => {
  return <RunningButton {...props} isEnd={isEnd} svg={svg} />;
};

const PauseButton = ({
  svg = (
    <Svg width={getSize(24)} height={getSize(28)} viewBox="0 0 24 28" fill="none">
      <Path d="M0 28H8V0H0V28ZM16 0V28H24V0H16Z" fill="black" />
    </Svg>
  ),
  ...props
}: RunningButtonProps) => {
  return <RunningButton {...props} svg={svg} />;
};

export {
  RunningButton,
  StartButton,
  PlayButton,
  EndButton,
  PauseButton,
};