import { View, Image, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/store";
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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
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
