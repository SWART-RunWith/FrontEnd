import { StyleSheet, Text, View } from "react-native";

import UserIcon from '@/assets/icons/user.svg';
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import getSize from "@/scripts/getSize";
import React from "react";

export const UserCountIcon: React.FC<{
  count: number;
}> = ({
  count,
}) => {
    return (
      <>
        <View style={userCountStyles.userIcon}>
          <UserIcon width={getSize(38)} height={getSize(38)} />
        </View>
        <View style={userCountStyles.countContainer}>
          <Text style={userCountStyles.count}>{count}</Text>
        </View>
      </>
    )
  }

const userCountStyles = StyleSheet.create({
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