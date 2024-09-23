import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard
} from "react-native";

import SearchIcon from '@/assets/icons/search.svg';
import { MainGradient } from "@/components/Gradient";
import { BackHeader } from "@/components/header/IconHeader";
import Styles from "@/constants/Styles";
import Colors from "@/constants/Colors";
import getSize from "@/scripts/getSize";
import Sizes from "@/constants/Sizes";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const { width } = Dimensions.get('window');

const CourseFeedSearchScreen = () => {
  const [text, setText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={Styles.container}>
        <MainGradient />
        <BackHeader />

        <View style={styles.searchBar}>
          <TouchableOpacity
            onPress={() => { }}
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              height: getSize(56),
            }}>
            <TextInput
              style={styles.searchInput}
              placeholder={"코스 이름, 지역"}
              placeholderTextColor={Colors.placeholder}
              value={text}
              onChangeText={setText}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchIcon}
          >
            <SearchIcon width={getSize(24)} height={getSize(24)} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Colors.grayBox,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(16),
    marginTop: getSize(61),
    borderRadius: 10,
    width: width - getSize(Sizes.formMargin),
    height: getSize(56),
  },
  searchInput: {
    color: 'white',
    fontSize: getSize(18),
    width: width - getSize(Sizes.formMargin) * 4,
    // backgroundColor: 'white',
  },
  searchIcon: {
    width: getSize(24),
    height: getSize(24),
  },
})
export default CourseFeedSearchScreen;