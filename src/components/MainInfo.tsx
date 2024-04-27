import { StyleSheet, View, useWindowDimensions } from "react-native";
import TextCustom from "./TextCustom";
import colors from "../utils/theme";
import { moderateScale } from "react-native-size-matters";
import {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  city: string;
  currentTemp: number;
  weather: string;
  maxTemp: number;
  minTemp: number;
  bottomSheetPosition: SharedValue<number>;
};
const MainInfo = ({
  city,
  currentTemp,
  weather,
  maxTemp,
  minTemp,
  bottomSheetPosition,
}: Props) => {
  const { height } = useWindowDimensions();
  const windowHeight = height;

  const titlePosition = useAnimatedStyle(() => {
    const position = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [0, 50],
      Extrapolate.EXTEND,
    );
    return {
      bottom: position,
    };
  });

  const daily = useAnimatedStyle(() => {
    const positionBottom = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [0, 70],
      Extrapolate.EXTEND,
    );
    const positionLeft = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [-95, 0],
      Extrapolate.EXTEND,
    );
    return {
      bottom: positionBottom,
      left: positionLeft,
    };
  });

  const weatherStyle = useAnimatedStyle(() => {
    const positionBottom = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [0, 70],
      Extrapolate.EXTEND,
    );
    const opacity = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [1, 0],
      Extrapolate.EXTEND,
    );
    return {
      bottom: positionBottom,
      left: 0,
      opacity: opacity,
      textAlign: "center",
    };
  });

  const tempSmall = useAnimatedStyle(() => {
    const positionBottom = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [125, 70],
      Extrapolate.EXTEND,
    );
    const positionLeft = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [95, 0],
      Extrapolate.EXTEND,
    );
    const fontSize = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [84, 20],
      Extrapolate.EXTEND,
    );
    const opacity = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [0, 1],
      Extrapolate.EXTEND,
    );
    return {
      bottom: positionBottom,
      left: positionLeft,
      fontSize: fontSize,
      opacity: opacity,
    };
  });

  const tempBig = useAnimatedStyle(() => {
    const positionBottom = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [0, 25],
      Extrapolate.EXTEND,
    );
    const positionLeft = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [10, -70],
      Extrapolate.EXTEND,
    );
    const fontSize = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [84, 20],
      Extrapolate.EXTEND,
    );
    const opacity = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.13],
      [1, 0],
      Extrapolate.EXTEND,
    );
    return {
      bottom: positionBottom,
      left: positionLeft,
      fontSize: fontSize,
      opacity: opacity,
    };
  });

  return (
    <View style={styles.container}>
      <TextCustom style={titlePosition} size={34}>
        {city}
      </TextCustom>
      <View
        style={{
          marginVertical: moderateScale(-20),
          paddingBottom: moderateScale(14),
        }}
      >
        <TextCustom style={tempBig} family='Signika-Light'>
          {currentTemp.toString().split(".")[0]}&deg;
        </TextCustom>
      </View>

      <TextCustom
        style={weatherStyle}
        color={colors.greyDark}
        size={20}
        family='Signika-SemiBold'
      >
        {weather}
      </TextCustom>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextCustom style={tempSmall}>
          {currentTemp.toString().split(".")[0]}&deg; | &nbsp;
        </TextCustom>
        <TextCustom style={daily} size={20} family='Signika-SemiBold'>
          H: {Math.round(maxTemp).toString()} &deg; L:{" "}
          {Math.round(minTemp).toString()}&deg;
        </TextCustom>
      </View>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(50),
  },
});
