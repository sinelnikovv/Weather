import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import TextCustom from "./TextCustom";
import colors from "../utils/theme";
import CityBackground from "../assets/images/cityItemBackground.svg";
import WeatherIconPicker from "./WeatherIconPicker";
import { SearchResponce } from "../store/reducers/geocodingSlice";
import { useGetWeatherQuery } from "../store/reducers/weather";

type Props = {
  item: SearchResponce;
};

const CityItem = ({ item }: Props) => {
  const { data, isLoading } = useGetWeatherQuery({
    lat: item.lat,
    lon: item.lon,
  });

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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TextCustom style={{ marginTop: moderateScale(12) }} size={64}>
            {data.current.temp.toString().split(".")[0]}&deg;
          </TextCustom>
          <TextCustom
            color={colors.greyDark}
            size={20}
            family='Signika-SemiBold'
          >
            H:{Math.round(data.daily[0].temp.max).toString()} &deg; L:{" "}
            {Math.round(data.daily[0].temp.min).toString()}&deg;
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
            <TextCustom size={17}>{item.name}</TextCustom>
            <TextCustom size={17}> {data.current.weather[0].main} </TextCustom>
          </View>
          <View style={styles.img}>
            <WeatherIconPicker
              code={data.current.weather[0].id.toString()}
              isDay={data.current.weather[0].icon.includes("d")}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CityItem;

const styles = StyleSheet.create({
  item: {
    alignItems: "flex-start",
    paddingLeft: moderateScale(20),
    paddingBottom: moderateScale(20),
    marginBottom: moderateScale(30),
  },
  img: {
    justifyContent: "flex-start",
    position: "absolute",
    right: 0,
    top: -moderateScale(12),
  },
});
