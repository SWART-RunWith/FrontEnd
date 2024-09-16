import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

import PlayIcon from '@/assets/icons/play.svg';
import StopIcon from '@/assets/icons/stop.svg';
import PauseIcon from '@/assets/icons/pause.svg';

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
    <PlayIcon width={getSize(22)} height={getSize(28)} />
  ),
  ...props
}: RunningButtonProps) => {
  return <RunningButton {...props}
    svg={svg}
    style={{
      paddingLeft: getSize(3),
    }}
  />;
};

const EndButton = ({
  isEnd = true,
  svg = (
    <StopIcon width={getSize(28)} height={getSize(28)} />
  ),
  ...props
}: RunningButtonProps) => {
  return <RunningButton {...props} isEnd={isEnd} svg={svg} />;
};

const PauseButton = ({
  svg = (
    <PauseIcon width={getSize(24)} height={getSize(28)} />
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