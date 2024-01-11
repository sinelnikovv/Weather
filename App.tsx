import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
          source={require("./src/assets/splashScreen.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: "Signika-Bold", fontSize: 30 }}>
          Inter Black
        </Text>
        <Text style={{ fontSize: 30 }}>Platform Default</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
