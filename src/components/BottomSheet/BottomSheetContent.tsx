import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import HourlyItem from "./HourlyItem";
import AirQuality from "./AirQuality";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useGetWeatherQuery } from "../../store/reducers/weatherAPI";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import UVIndex from "./UVIndex";
import Sunrise from "./Sunrise";
import Wind from "./Wind";
import Rainfall from "./Rainfall";
import FeelsLike from "./FeelsLIke";
import Visibility from "./Visibility";
import Pressure from "./Pressure";
import moment from "moment";
import Humidity from "./Humidity";
import { setSelectedWeather } from "../../store/reducers/selectedWeatherSlice";
import { useEffect, useRef } from "react";
import { useGetPollutionQuery } from "../../store/reducers/pollutionAPI";
import { gradient } from "../../utils/theme";

type Props = {
  bottomSheetPosition: SharedValue<number>;
  isOpened: boolean;
};

const BottomSheetContent = ({ bottomSheetPosition, isOpened }: Props) => {
  const location = useSelector((state: RootState) => state.location);

  const { data, isLoading, isFetching } = useGetWeatherQuery(location);
  const hourly = data?.hourly?.slice(0, 24);

  const pollution = useGetPollutionQuery(location);

  const { height } = useWindowDimensions();

  const borderColor = useAnimatedStyle(() => {
    const radius = interpolate(
      bottomSheetPosition.value,
      [height * 0.63, height * 0.13],
      [0.8, 0],
      Extrapolate.EXTEND,
    );

    return {
      borderColor: `rgba(255, 255, 255, ${radius})`,
    };
  });

  const borderRadius = useAnimatedStyle(() => {
    const radius = interpolate(
      bottomSheetPosition.value,
      [height * 0.63, height * 0.13],
      [45, 1],
      Extrapolate.EXTEND,
    );

    return {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    };
  });

  const flatlistPadding = useAnimatedStyle(() => {
    const padding = interpolate(
      bottomSheetPosition.value,
      [height * 0.63, height * 0.13],
      [120, 0],
      Extrapolate.EXTEND,
    );

    return {
      paddingBottom: padding,
    };
  });
  const currentWeather = data?.hourly.find((item) => {
    const unixTimestamp = item.dt;
    const timezoneOffset = data.timezone_offset;
    const timestampInMilliseconds = +unixTimestamp * 1000;
    const localTime = moment
      .utc(timestampInMilliseconds)
      .add(timezoneOffset, "seconds");

    const nowLocal = moment.utc().add(timezoneOffset, "seconds");

    return nowLocal.isSame(localTime, "hour");
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentWeather && pollution.data) {
      const pollutionItem = pollution.data.list.filter(
        (item) => item.dt === currentWeather.dt,
      )[0];
      dispatch(
        setSelectedWeather({
          ...currentWeather,
          sunrise: data.current.sunrise,
          sunset: data.current.sunset,
          pollution: pollutionItem,
        }),
      );
    }
  }, [location, currentWeather, pollution.data]);

  const selectedWeather = useSelector(
    (state: RootState) => state.selectedWeather,
  );

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!isOpened) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [isOpened]);

  return (
    <Animated.View style={[styles.blurView, borderRadius, borderColor]}>
      <LinearGradient
        style={styles.linearGradient}
        {...gradient.bottomSheetGradient}
      />
      <Image
        style={styles.absoluteImage}
        source={require("../../assets/svg/white.png")}
      />
      <Image
        style={styles.absoluteImage}
        source={require("../../assets/svg/purple.png")}
      />
      <Image
        style={styles.roundGradientImage}
        source={require("../../assets/images/roundGradient.png")}
      />
      <BlurView intensity={20} tint='dark' />
      <View style={styles.contentContainer}>
        {isFetching || isLoading ? (
          <></>
        ) : (
          <ScrollView
            scrollEnabled={isOpened}
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[{ marginBottom: moderateScale(20) }, flatlistPadding]}
            >
              <FlatList
                data={hourly}
                keyExtractor={(item) => item.dt.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setSelectedWeather({
                          ...item,
                          sunrise: data.current.sunrise,
                          sunset: data.current.sunset,
                          pollution: pollution.data.list.filter(
                            (pollutionItem) => pollutionItem.dt === item.dt,
                          )[0],
                        }),
                      );
                      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    }}
                  >
                    <HourlyItem
                      time={item.dt}
                      temp={item.temp}
                      code={item.weather[0].id.toString()}
                      isDay={item.weather[0].icon.includes("d")}
                    />
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
            <AirQuality />
            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(10),
                marginBottom: moderateScale(10),
              }}
            >
              <UVIndex value={selectedWeather.uvi} />
              <Sunrise />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(10),
                marginBottom: moderateScale(10),
              }}
            >
              <Wind
                speed={selectedWeather.wind_speed}
                deg={selectedWeather.wind_deg}
              />
              <Rainfall
                rain={selectedWeather.rain ? selectedWeather.rain : { "1h": 0 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(10),
                marginBottom: moderateScale(10),
              }}
            >
              <FeelsLike
                temp={selectedWeather.temp}
                feelsLike={selectedWeather.feels_like}
              />
              <Humidity
                dew={selectedWeather.dew_point}
                humidity={selectedWeather.humidity}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(10),
                marginBottom: moderateScale(10),
              }}
            >
              <Visibility visibility={selectedWeather.visibility} />
              <Pressure pressure={selectedWeather.pressure} />
            </View>
          </ScrollView>
        )}
      </View>
    </Animated.View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  blurView: {
    borderRadius: moderateScale(45),
    overflow: "hidden",
    paddingTop: moderateScale(32),
    borderWidth: 0.2,
    borderTopWidth: 1,
    left: -1,
    right: -1,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absoluteImage: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  roundGradientImage: {
    position: "absolute",
    right: 0,
    bottom: 400,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
  },
});
