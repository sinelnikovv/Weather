import { View, Image, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
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
      <SafeAreaProvider>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
