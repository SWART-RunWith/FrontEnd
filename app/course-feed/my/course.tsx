import { View } from "react-native";

import Styles from "@/constants/Styles";
import { BackOptionHeader } from "@/components/header/IconHeader";
import { useRoute } from "@react-navigation/native";
import { CourseSaveScreenRouteProp } from "@/scripts/navigation";

const MyCourseScreen = () => {
  const route = useRoute<CourseSaveScreenRouteProp>();
  const { folderId } = route.params;

  return (
    <View style={Styles.container} >
      <BackOptionHeader
        onPressBack={() => { }}
        onPressOption={() => { }}
      />

      <View>
        <View>

        </View>
        <View>

        </View>
      </View>

      <View>

      </View>
    </View>
  );
}

export default MyCourseScreen;