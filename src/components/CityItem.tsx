import { Dimensions, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import TextCustom from "./TextCustom";
import colors from "../utils/theme";
import CityBackground from "../assets/images/cityItemBackground.svg";
import WeatherIconPicker from "./WeatherIconPicker";

type Props = {
  location: string;
  tempCurrent: string;
  maxTemp: number;
  minTemp: number;
  weather: string;
  code: string;
  isDay: boolean;
};

const CityItem = ({
  location,
  tempCurrent,
  maxTemp,
  minTemp,
  weather,
  code,
  isDay,
}: Props) => {
  const width = Dimensions.get("screen").width;
  return (
    <View style={styles.item}>
      <CityBackground
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        width={width - moderateScale(32)}
        height={moderateScale(184)}
      />

      <TextCustom style={{ marginTop: moderateScale(12) }} size={64}>
        {tempCurrent.toString().split(".")[0]}&deg;
      </TextCustom>
      <TextCustom color={colors.greyDark} size={20} family='Signika-SemiBold'>
        H:{Math.round(maxTemp).toString()} &deg; L:{" "}
        {Math.round(minTemp).toString()}&deg;
      </TextCustom>
      <View
        style={{
          marginTop: moderateScale(6),
          marginRight: moderateScale(16),
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "stretch",
        }}
      >
        <TextCustom size={17}>{location}</TextCustom>
        <TextCustom size={17}> {weather} </TextCustom>
      </View>

      <View style={styles.img}>
        <WeatherIconPicker code={code} isDay={isDay} />
      </View>
    </View>
  );
};

export default CityItem;

const styles = StyleSheet.create({
  item: {
    alignItems: "flex-start",
    paddingLeft: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  img: {
    justifyContent: "flex-start",
    position: "absolute",
    right: 0,
    top: -moderateScale(12),
  },
});
