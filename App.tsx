import { View, Image, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/store";
import * as Location from "expo-location";
import { setLocation } from "./src/store/reducers/locationSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const AppMain = () => {
  const [fontsLoaded] = useFonts({
    "Signika-Light": require("./src/assets/fonts/SignikaNegative-Light.ttf"),
    "Signika-Regular": require("./src/assets/fonts/SignikaNegative-Regular.ttf"),
    "Signika-Medium": require("./src/assets/fonts/SignikaNegative-Medium.ttf"),
    "Signika-SemiBold": require("./src/assets/fonts/SignikaNegative-SemiBold.ttf"),
    "Signika-Bold": require("./src/assets/fonts/SignikaNegative-Bold.ttf"),
  });

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const dispatch = useDispatch();

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync();
        const response: { display_name: string } = await fetch(
          `https://us1.locationiq.com/v1/reverse?key=YOUR_ACCESS_TOKEN&lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&format=json`,
        ).then((res) => res.json());

        dispatch(
          setLocation({
            lat: currentLocation.coords.latitude.toString(),
            lon: currentLocation.coords.longitude.toString(),
            name: response.display_name,
          }),
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    requestLocationPermission();
    getLocation();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("./src/assets/images/splashScreen.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  } else {
    return (
      <>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </>
    );
  }
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppMain />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
