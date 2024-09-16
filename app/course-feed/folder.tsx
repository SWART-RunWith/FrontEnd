import { Text, View } from "react-native";

import { DefaultButton } from "@/components/button/Button";
import Styles from '@/constants/Styles';
import getSize from "@/scripts/getSize";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "@/scripts/navigation";

const FolderScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <View style={{
        justifyContent: 'center',
        height: '30%',
      }}>
        <Text style={{
          color: 'white',
          fontSize: getSize(20),
        }}>
          This is Course Save Folder Screen.
        </Text>
      </View>

      <DefaultButton
        style={{
          marginTop: getSize(100),
        }}
        onPress={() => navigation.navigate('home')}
      />
    </View>
  );
};

export default FolderScreen;