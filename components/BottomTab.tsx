import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RunningIcon from "@/assets/icons/bottom/running.svg";
import RunningIcon_s from "@/assets/icons/bottom/running_s.svg";
import CourseFeedIcon from "@/assets/icons/bottom/courseFeed.svg";
import CourseFeedIcon_s from "@/assets/icons/bottom/courseFeed_s.svg";
import ProfileIcon from "@/assets/icons/bottom/profile.svg";
import ProfileIcon_s from "@/assets/icons/bottom/profile_s.svg";
import CrewFeedIcon from "@/assets/icons/bottom/crew.svg";
import CrewFeedIcon_s from "@/assets/icons/bottom/crew_s.svg";
import RecordIcon from "@/assets/icons/bottom/record.svg";
import RecordIcon_s from "@/assets/icons/bottom/record_s.svg";
import Colors from '@/constants/Colors';
import { BottomBarNavigationProp } from '@/scripts/navigation';
import { resetNavigationStack } from '@/scripts/resetNavigationStack';
import getSize from '@/scripts/getSize';

const { width } = Dimensions.get('window');

// Tab 정보 배열
const tabs = [
  { name: 'CourseFeed', icon: CourseFeedIcon, selectedIcon: CourseFeedIcon_s, route: 'course-feed/home' },
  { name: 'CrewFeed', icon: CrewFeedIcon, selectedIcon: CrewFeedIcon_s, route: 'crew-feed/home' },
  { name: 'Running', icon: RunningIcon, selectedIcon: RunningIcon_s, route: 'home' },
  { name: 'Record', icon: RecordIcon, selectedIcon: RecordIcon_s, route: 'user/record' },
  { name: 'Profile', icon: ProfileIcon, selectedIcon: ProfileIcon_s, route: 'user/profile' },
];

interface BottomTabProps {
  route: 'CourseFeed' | 'CrewFeed' | 'Running' | 'Record' | 'Profile';
  reload?: boolean;
}

const BottomTab: React.FC<BottomTabProps> = ({
  route,
  reload = true
}) => {
  const navigation = useNavigation<BottomBarNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<string>(route);

  useEffect(() => {
    setSelectedTab(route);
  }, [route]);

  const handleTabPress = (tabName: string, route: string) => {
    if (tabName !== selectedTab || reload) {
      setSelectedTab(tabName);
      resetNavigationStack(navigation, route);
    }
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const Icon = selectedTab === tab.name
          ? tab.selectedIcon
          : tab.icon;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.name, tab.route)}
          >
            <Icon width={getSize(26)} height={getSize(26)} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.navigator,
    width: width,
    height: getSize(90),
    position: 'absolute',
    bottom: 0,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 5,
    height: getSize(56),
  },
});

export default BottomTab;
