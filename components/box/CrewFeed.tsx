import React, { useEffect, useRef } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

import NextIcon from '@/assets/icons/next.svg';
import OptionIcon from '@/assets/icons/option.svg';
import LocationIcon from '@/assets/icons/location.svg';
import UserIcon from '@/assets/icons/user.svg';
import RunningIcon from '@/assets/icons/running.svg';
import Colors from "@/constants/Colors";
import getSize from "@/scripts/getSize";
import Fonts from "@/constants/Fonts";

/*
메인 코스 피드 박스
*/
interface CrewBoxProps {
  name: string;
  event?: string;
  date?: string;
  backgroundImg?: any;
}

interface AuthorProps {
  name: string;
}

// button props
interface CrewBoxPressProps {
  onPress: () => void;
  onPressButton: () => void;
}

interface NextButtonProps {
  onPressNext: () => void;
}

interface OptionButtonProps {
  onPressOption: () => void;
}

export const CrewBox: React.FC<
  CrewBoxProps &
  CrewBoxPressProps &
  NextButtonProps
> = ({
  name = '경달',
  backgroundImg = '',
  onPress,
  onPressButton,
  onPressNext,
}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[crewBotStyles.container]}>
        <ImageBackground
          style={crewBotStyles.imageContainer}
          resizeMode="stretch"
          source={backgroundImg}
        >
          <View style={crewBotStyles.textContainer}>
            <Text style={crewBotStyles.name}>{name}</Text>
          </View>
          <TouchableOpacity
            style={crewBotStyles.nextIcon}
            onPress={onPressNext}
          >
            <NextIcon width={getSize(44)} height={getSize(44)} />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


const crewBotStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrayBox,
    width: getSize(170),
    height: getSize(248),
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  imageContainer: {
    backgroundColor: '#d9d9d9',
    width: getSize(170),
    height: getSize(248),
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    height: getSize(44),
    marginTop: getSize(12),
  },
  name: {
    color: Colors.main,
    fontSize: getSize(20),
    fontFamily: Fonts.semiBold,
  },
  nextIcon: {
    position: 'absolute',
    bottom: getSize(12),
    right: getSize(12),
  },
});

interface CrewFeedProps {
  location: string;
  count: number;
}

export const CrewFeedBox: React.FC<
  CrewBoxProps &
  CrewFeedProps &
  OptionButtonProps
> = ({
  name = '',
  count = 0,
  location = '',
  backgroundImg = '',
  date = '',
  event = '',
  onPressOption,
}) => {
    return (
      <View style={crewFeedStyles.container}>
        <ImageBackground
          style={crewFeedStyles.backgroundImg}
          resizeMode="cover"
          source={backgroundImg}
        >
          <TouchableOpacity style={crewFeedStyles.optionIcon}>
            <OptionIcon width={getSize(5.33)} height={getSize(24)} />
          </TouchableOpacity>
          <View style={crewFeedStyles.topContainer}>
            <View style={crewFeedStyles.locationContainer}>
              <LocationIcon width={getSize(17)} height={getSize(24)} />
              <Text style={crewFeedStyles.location}>{location}</Text>
            </View>
            <Text style={crewFeedStyles.crewName}>{name}</Text>
          </View>
          <BlurView
            intensity={10}
            style={crewFeedStyles.bottomBlurContainer}
          >
            <RunningIcon />
            <View>
              <Text style={crewFeedStyles.runningDate}>{date}</Text>
              <Text style={crewFeedStyles.runningEvent}>{event}</Text>
            </View>
          </BlurView>
        </ImageBackground>
        <View style={crewFeedStyles.userIcon}>
          <UserIcon width={getSize(38)} height={getSize(38)} />
        </View>
        <View style={crewFeedStyles.countContainer}>
          <Text style={crewFeedStyles.count}>{count}</Text>
        </View>
      </View >
    );
  };

const crewFeedStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: getSize(290),
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  backgroundImg: {
    width: '100%',
    height: getSize(290),
  },
  topContainer: {
    paddingHorizontal: getSize(14),
    marginTop: getSize(18),
    height: getSize(67),
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getSize(24),
    width: '100%',
    gap: getSize(6),
  },
  location: {
    color: 'white',
    fontSize: getSize(14),
    fontFamily: Fonts.semiBold,
    height: getSize(17),
  },
  crewName: {
    color: Colors.main,
    fontSize: getSize(36),
    fontFamily: Fonts.bold,
    height: getSize(43),
  },
  bottomBlurContainer: {
    marginTop: getSize(147),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: getSize(14),
    height: getSize(58),
    gap: getSize(12.2),
  },
  runningDate: {
    color: 'white',
    fontSize: getSize(14),
    fontFamily: Fonts.medium,
    height: getSize(17),
  },
  runningEvent: {
    color: Colors.main,
    fontSize: getSize(16),
    fontFamily: Fonts.bold,
    height: getSize(19),
  },
  optionIcon: {
    position: 'absolute',
    alignItems: 'center',
    width: getSize(20),
    height: getSize(20.28),
    top: getSize(15),
    right: getSize(13),
    zIndex: 1,
  },
  userIcon: {
    position: 'absolute',
    alignItems: 'center',
    right: getSize(15),
    bottom: getSize(15),
  },
  countContainer: {
    position: 'absolute',
    backgroundColor: Colors.main,
    height: getSize(16),
    width: getSize(30),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    right: getSize(19),
    bottom: getSize(9),
  },
  count: {
    fontSize: getSize(12),
    fontFamily: Fonts.bold,
  },
})