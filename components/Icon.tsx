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
      <View style={{
        height: getSize(44),
        width: getSize(38),
      }} >
        <UserIcon width={getSize(38)} height={getSize(38)} />
        <View style={userCountStyles.countContainer}>
          <Text style={userCountStyles.count}>{count}</Text>
        </View>
      </View>
    )
  }

const userCountStyles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    backgroundColor: Colors.main,
    height: getSize(16),
    width: getSize(30),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    left: getSize(3),
    top: getSize(27),
  },
  count: {
    fontSize: getSize(12),
    fontFamily: Fonts.bold,
  },
})