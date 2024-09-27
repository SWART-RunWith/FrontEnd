import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

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
import { useNavigation } from '@react-navigation/native';
import { BottomBarNavigationProp } from '@/scripts/navigation';
import { resetNavigationStack } from '@/scripts/resetNavigationStack';

const { width } = Dimensions.get('window');

const tabs = [
  { name: 'Running', icon: RunningIcon, selectedIcon: RunningIcon_s, route: 'home' },
  { name: 'CourseFeed', icon: CourseFeedIcon, selectedIcon: CourseFeedIcon_s, route: 'course-feed/home' },
  { name: 'CrewFeed', icon: CrewFeedIcon, selectedIcon: CrewFeedIcon_s, route: 'crew-feed/home' },
  { name: 'Record', icon: RecordIcon, selectedIcon: RecordIcon_s, route: 'user/record' },
  { name: 'Profile', icon: ProfileIcon, selectedIcon: ProfileIcon_s, route: 'user/profile' },
];

const BottomTab = () => {
  const navigation = useNavigation<BottomBarNavigationProp>();

  const [selectedTab, setSelectedTab] = useState('Running');

  const handleTabPress = (tabName: string, route: string) => {
    setSelectedTab(tabName);
    resetNavigationStack(navigation, route);
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const Icon = selectedTab === tab.name ? tab.selectedIcon : tab.icon;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.name, tab.route)}
          >
            <Icon width={24} height={24} />
            <Text style={selectedTab === tab.name ? styles.selectedTabLabel : styles.tabLabel}>
              {tab.name}
            </Text>
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
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width,
    height: 60,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  selectedTabLabel: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
});

export default BottomTab;
