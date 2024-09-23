import { Dimensions, StyleSheet, View } from "react-native";

import { FolderButton } from "@/components/button/FolderButton";
import Sizes from "@/constants/Sizes";
import getSize from "@/scripts/getSize";
import { useNavigation } from "@react-navigation/native";
import { CourseFeedScreenNavigationProp } from "@/scripts/navigation";

const { width } = Dimensions.get('window');

interface FolderContainerProp {
  folderList: {
    name: string,
    id: number,
  }[],
  isSelected?: boolean,
  count?: number,
}

export const FolderContainer: React.FC<FolderContainerProp> = ({
  folderList,
  isSelected = false,
  count = 0,
}) => {
  const navigation = useNavigation<CourseFeedScreenNavigationProp>();

  return (
    <View style={styles.folderContainer}>
      <View style={styles.folderList}>
        {folderList.map((folder) => (
          <View key={folder.id} style={styles.folderWrapper}>
            <FolderButton
              isSelected={isSelected}
              name={folder.name}
              count={count}
              onPress={() => {
                console.log("folder.id : ", folder.id);
                navigation.navigate(
                  'course-feed/my/course',
                  { folderId: folder.id }
                );
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  folderContainer: {
    paddingHorizontal: getSize(16),
  },
  folderList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: getSize(24),
  },
  folderWrapper: {
    width: (width - getSize(Sizes.formMargin * 2)) / 2 - 7,
    marginBottom: getSize(22),
  }
})