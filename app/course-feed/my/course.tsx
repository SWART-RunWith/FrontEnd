import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput
} from "react-native";
import { useRoute } from "@react-navigation/native";

import LocationIcon from '@/assets/icons/location.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { BackOptionHeader } from "@/components/header/IconHeader";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Sizes from "@/constants/Sizes";
import Styles from "@/constants/Styles";
import getSize from "@/scripts/getSize";
import { CourseSaveScreenRouteProp } from "@/scripts/navigation";

const { width } = Dimensions.get('window');

const MyCourseScreen = () => {
  const route = useRoute<CourseSaveScreenRouteProp>();
  const { folderId } = route.params;
  const [courseName, setCourseName] = useState('');

  const folderName = '서천동';

  return (
    <View style={Styles.container} >
      <BackOptionHeader
        onPressBack={() => { }}
        onPressOption={() => { }}
      />

      <View style={styles.topContainer}>
        <View style={styles.folderNameContainer}>
          <LocationIcon width={getSize(17)} height={getSize(24)} />
          <View style={styles.folderNameWrapper}>
            <Text style={styles.folderNameText}>{folderName}</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <SearchIcon width={getSize(24)} height={getSize(24)} />
          <TextInput
            style={styles.searchInput}
            placeholder="코스를 입력해주세요"
            placeholderTextColor={Colors.placeholder}
            value={courseName}
            onChangeText={setCourseName}
          />
        </View>
      </View>

      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: width - getSize(Sizes.formMargin),
    height: getSize(105),
  },
  folderNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(10),
    marginTop: getSize(27),
    gap: getSize(7),
  },
  folderNameWrapper: {
    height: getSize(29),
  },
  folderNameText: {
    color: 'white',
    fontSize: getSize(24),
    fontFamily: Fonts.bold,
  },
  searchBar: {
    backgroundColor: Colors.grayBox,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: getSize(56),
    paddingHorizontal: getSize(10),
    marginTop: getSize(20),
    borderRadius: 10,
    gap: getSize(10),
  },
  searchInput: {
    color: 'white',
    fontSize: getSize(18),
  },
  courseListContainer: {

  },
})

export default MyCourseScreen;