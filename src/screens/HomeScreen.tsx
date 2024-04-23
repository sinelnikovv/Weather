import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import MainInfo from "../components/MainInfo";
import Tabbar from "../components/TabBar";
import { moderateScale } from "react-native-size-matters";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useGetWeatherQuery } from "../store/reducers/weather";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import HourlyItem from "../components/HourlyItem";
import colors from "../utils/theme";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const HomeScreen = ({ navigation }) => {
  const location = useSelector((state: RootState) => state.location);
  const { data, refetch, isLoading, isFetching } = useGetWeatherQuery(location);
  const hourly = data?.hourly?.slice(0, 24);

  useEffect(() => {
    refetch();
  }, [location]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { height } = useWindowDimensions();
  const windowHeight = height;

  const snapPoints = useMemo(
    () => [windowHeight * 0.4, windowHeight * 0.8],
    [],
  );

  const bottomSheetPosition = useSharedValue(0);
  const backgroundStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.2],
      [0, -windowHeight],
    );

    const opacity = interpolate(
      bottomSheetPosition.value,
      [windowHeight * 0.6, windowHeight * 0.2],
      [1, 0],
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
      opacity: opacity,
    };
  });

  return (
    <ScreenWrapper gradient={true}>
      <Animated.Image
        source={require("../assets/images/background.png")}
        resizeMode='cover'
        style={[styles.background, backgroundStyle]}
      />
      <View style={styles.mainInfoContainer}>
        {data && (
          <MainInfo
            city={data.timezone.split("/")[1].replace("_", " ")}
            currentTemp={data.current.temp}
            weather={data.current.weather[0].main}
            maxTemp={data.daily[0].temp.max}
            minTemp={data.daily[0].temp.min}
          />
        )}
      </View>
      <View style={styles.containerSheet}>
        <BottomSheet
          animatedPosition={bottomSheetPosition}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          backgroundStyle={styles.none}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BlurView intensity={20} tint='dark' style={styles.blurView}>
            <Image
              style={styles.absoluteImage}
              source={require("../assets/svg/white.png")}
            />
            <Image
              style={styles.absoluteImage}
              source={require("../assets/svg/purple.png")}
            />
            <Image
              style={styles.roundGradientImage}
              source={require("../assets/images/roundGradient.png")}
            />

            <LinearGradient
              style={styles.linearGradient}
              colors={["rgba(86, 46, 90, 0.3)", "rgba(28, 27, 51, 0.3)"]}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 1, y: -1 }}
            />
            <View style={styles.contentContainer}>
              {isFetching || isLoading ? (
                <View
                  style={{
                    flex: 1,
                    top: moderateScale(50),
                  }}
                >
                  <ActivityIndicator size='large' color={colors.white} />
                </View>
              ) : (
                <FlatList
                  data={hourly}
                  keyExtractor={(item) => item.dt.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContent}
                  renderItem={({ item }) => (
                    <HourlyItem
                      time={item.dt}
                      temp={item.temp}
                      code={item.weather[0].id.toString()}
                      isDay={item.weather[0].icon.includes("d")}
                    />
                  )}
                />
              )}
            </View>
          </BlurView>
        </BottomSheet>
      </View>
      <View style={styles.tabbarContainer}>
        <Tabbar navigation={navigation} />
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainInfoContainer: {
    marginTop: moderateScale(50),
  },
  containerSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  none: {
    display: "none",
  },
  handleIndicator: {
    top: moderateScale(24),
    height: moderateScale(5),
    width: moderateScale(48),
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  blurView: {
    borderRadius: moderateScale(45),
    overflow: "hidden",
    paddingTop: moderateScale(32),
    borderTopLeftRadius: moderateScale(45),
    borderTopRightRadius: moderateScale(45),
    borderColor: colors.white,
    borderWidth: 0.2,
    borderTopWidth: 1,
    left: -1,
    right: -1,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
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
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: moderateScale(16),
  },
  tabbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
