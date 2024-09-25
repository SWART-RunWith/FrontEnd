import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Styles from "@/constants/Styles";
import { CourseFeedMainScreenNavigationProp, CourseFeedMainScreenRouteProp } from "@/scripts/navigation";

const CourseFEedDetailScreen = () => {
  const navigation = useNavigation<CourseFeedMainScreenNavigationProp>();
  const route = useRoute<CourseFeedMainScreenRouteProp>();
  const { courseId } = route.params;

  return (
    <View style={Styles.container}>

    </View>
  );
};

export default CourseFEedDetailScreen;