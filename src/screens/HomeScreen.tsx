import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import MainInfo from "../components/MainInfo";
import Tabbar from "../components/TabBar";
import { moderateScale } from "react-native-size-matters";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetWeatherQuery } from "../store/reducers/weatherAPI";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import BottomSheetContent from "../components/BottomSheet/BottomSheetContent";
import * as Location from "expo-location";
import { setLocation } from "../store/reducers/locationSlice";
import { colors } from "../utils/theme";

const HomeScreen = ({ navigation }) => {
  const location = useSelector((state: RootState) => state.location);
  const { data, refetch } = useGetWeatherQuery(location);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setIsLoading(true);
        const currentLocation = await Location.getCurrentPositionAsync();
        const response = await fetch(
          `https://us1.locationiq.com/v1/reverse?key=pk.0e1ce1fb5b5bcae2803eef081c2d6846&lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&format=json`,
        ).then((res) => res.json());

        dispatch(
          setLocation({
            lat: currentLocation.coords.latitude.toString(),
            lon: currentLocation.coords.longitude.toString(),
            name: response.address.city,
          }),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    refetch();
  }, [location]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { height } = useWindowDimensions();

  const snapPoints = useMemo(() => [height * 0.37, height * 0.87], []);

  const bottomSheetPosition = useSharedValue(0);
  const backgroundStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      bottomSheetPosition.value,
      [height * 0.63, height * 0.13],
      [0, -height],
    );

    const opacity = interpolate(
      bottomSheetPosition.value,
      [height * 0.4, height * 0.13],
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
  const backgroundColor = useAnimatedStyle(() => {
    const opacity = interpolate(
      bottomSheetPosition.value,
      [height * 0.63, height * 0.13],
      [0, 1],
    );

    return {
      opacity: opacity,
    };
  });

  const tabBarPosition = useAnimatedStyle(() => {
    const translateY = interpolate(
      bottomSheetPosition.value,
      [height * 0.63, height * 0.13],
      [0, 100],
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <ScreenWrapper>
      <Animated.Image
        source={require("../assets/images/background.png")}
        resizeMode='cover'
        style={[styles.background, backgroundStyle]}
      />
      <Animated.View
        style={[
          styles.background,
          { backgroundColor: "#422E5A" },
          backgroundColor,
        ]}
      />
      {isLoading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1,
            zIndex: 99,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ActivityIndicator size='large' color={colors.white} />
        </View>
      )}
      <View>
        {data && (
          <MainInfo
            city={location.name ? location.name : data.timezone.split("/")[1]}
            currentTemp={data.current.temp}
            weather={data.current.weather[0].main}
            maxTemp={data.daily[0].temp.max}
            minTemp={data.daily[0].temp.min}
            bottomSheetPosition={bottomSheetPosition}
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
          onChange={(index) => {
            index === 1 && setIsOpened(true);
            index === 0 && setIsOpened(false);
          }}
        >
          <BottomSheetContent
            isOpened={isOpened}
            bottomSheetPosition={bottomSheetPosition}
          />
        </BottomSheet>
      </View>
      <Animated.View style={[styles.tabbarContainer, tabBarPosition]}>
        <Tabbar
          getCurrentLocation={getCurrentLocation}
          navigation={navigation}
        />
      </Animated.View>
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
  tabbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
