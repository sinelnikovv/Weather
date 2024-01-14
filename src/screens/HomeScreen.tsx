import { StyleSheet, View, ImageBackground } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import MainInfo from "../components/MainInfo";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode='cover'
        style={styles.backgroung}
      >
        <ScreenWrapper>
          <MainInfo city={"Monreal"} currentTemp='19' weather='Mostly Clear' />
        </ScreenWrapper>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroung: {
    flex: 1,
  },
});
