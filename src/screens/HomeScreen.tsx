import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  FlatList,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import MainInfo from "../components/MainInfo";
import Tabbar from "../components/TabBar";
import { moderateScale } from "react-native-size-matters";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useGetWeatherQuery } from "../store/reducers/weather";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import HourlyItem from "../components/HourlyItem";
import colors from "../utils/theme";

const HomeScreen = ({ navigation }) => {
  const location = useSelector((state: RootState) => state.location);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => [moderateScale(325), moderateScale(700)],
    [],
  );
  const { data, refetch } = useGetWeatherQuery(location);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const hourly = data.hourly.slice(0, 24);

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      resizeMode='cover'
      style={styles.background}
    >
      <ScreenWrapper gradient={false}>
        <View style={{ marginTop: moderateScale(50) }}>
          {!!data ? (
            <MainInfo
              city={data.timezone.split("/")[1].replace("_", " ")}
              currentTemp={data.current.temp}
              weather={data.current.weather[0].main}
              maxTemp={data.daily[0].temp.max}
              minTemp={data.daily[0].temp.min}
            />
          ) : null}
        </View>
        <View style={styles.containerSheet}>
          <BottomSheet
            ref={bottomSheetRef}
            backgroundStyle={{ display: "none" }}
            handleIndicatorStyle={{
              top: moderateScale(24),
              height: moderateScale(5),
              width: moderateScale(48),
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BlurView
              intensity={20}
              tint='dark'
              style={{
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
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                }}
                source={require("../assets/svg/white.png")}
              />
              <Image
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                }}
                source={require("../assets/svg/purple.png")}
              />
              <Image
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 400,
                }}
                source={require("../assets/images/roundGradient.png")}
              />

              <LinearGradient
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  // opacity: 26,
                }}
                colors={["rgba(86, 46, 90, 0.3)", "rgba(28, 27, 51, 0.3)"]}
                start={{ x: 0, y: 0.6 }}
                end={{ x: 1, y: -1 }}
              />
              <View style={styles.contentContainer}>
                <FlatList
                  data={hourly}
                  keyExtractor={(item) => item.dt.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(16),
                  }}
                  renderItem={({ item }) => (
                    <HourlyItem
                      time={item.dt}
                      temp={item.temp}
                      code={item.weather[0].id.toString()}
                      isDay={item.weather[0].icon.includes("d")}
                    />
                  )}
                />
              </View>
            </BlurView>
          </BottomSheet>
        </View>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Tabbar navigation={navigation} />
        </View>
      </ScreenWrapper>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  containerSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
