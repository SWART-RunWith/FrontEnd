import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';
import Sizes from '@/constants/Sizes';

const { width } = Dimensions.get('window');

interface HeaderProps {
  leftIcons?: Array<{ icon: string, onPress: () => void }>;
  rightIcons?: Array<{ icon: string, onPress: () => void }>;
  rightIcons2?: Array<{ icon: string, onPress: () => void }>;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  titleStyle?: object;
  containerStyle?: object;
}

const DefaultHeader = ({
  leftIcons = [],
  rightIcons = [],
  rightIcons2 = [],
  text = '',
  fontSize = 20,
  fontFamily = 'Hanson',
  fontColor = Colors.main,
  containerStyle = {},
}: HeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* 왼쪽 아이콘 그룹 */}
      <View style={styles.leftIcons}>
        {leftIcons.map((iconObj, index) => (
          <TouchableOpacity key={index} onPress={iconObj.onPress} style={styles.iconButton}>
            <Text style={styles.iconText}>{iconObj.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 중앙 텍스트 */}
      <View style={styles.centerText}>
        <Text style={{
          fontSize: getSize(fontSize),
          fontFamily,
          color: fontColor
        }}>{text}
        </Text>
      </View>

      {/* 오른쪽 아이콘 그룹 */}
      <View style={styles.rightIcons}>
        {rightIcons.map((iconObj, index) => (
          <TouchableOpacity key={index} onPress={iconObj.onPress} style={styles.iconButton}>
            <Text style={styles.iconText}>{iconObj.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 오른쪽 아이콘 그룹2 */}
      <View style={styles.rightIcons}>
        {rightIcons2.map((iconObj, index) => (
          <TouchableOpacity key={index} onPress={iconObj.onPress} style={styles.iconButton}>
            <Text style={styles.iconText}>{iconObj.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const LoginHeader = ({
  text = '로그인',
  fontFamily = 'Pretendard-SemiBold',
  fontSize = Sizes.pageTitle,
  ...props
}: HeaderProps) => {
  return <DefaultHeader {...props}
    text={text}
    fontFamily={fontFamily}
    fontSize={getSize(fontSize)}
  />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: getSize(57),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(15),
  },
  leftIcons: {
    flexDirection: 'row',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: getSize(10),
  },
  iconText: {
    fontSize: getSize(20),
    color: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
});

export {
  DefaultHeader,
  LoginHeader
};
