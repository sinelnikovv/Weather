import { StyleSheet, View } from "react-native";
import TextCustom from "./TextCustom";
import colors from "../utils/theme";
import { moderateScale } from "react-native-size-matters";

type Props = {
  city: string;
  currentTemp: number;
  weather: string;
};
const MainInfo = ({ city, currentTemp, weather }: Props) => {
  return (
    <View style={styles.container}>
      <TextCustom size={34}>{city}</TextCustom>
      <View
        style={{
          marginVertical: moderateScale(-30),
          paddingBottom: moderateScale(14),
        }}
      >
        <TextCustom size={84} family='Signika-Light'>
          {currentTemp.toString().split(".")[0]}&deg;
        </TextCustom>
      </View>

      <TextCustom color={colors.secondary} size={20} family='Signika-SemiBold'>
        {weather}
      </TextCustom>
      <TextCustom size={20} family='Signika-SemiBold'>
        H: 17&deg; L:19&deg;
      </TextCustom>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  container: {},
});
