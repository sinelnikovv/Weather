import { StyleSheet, View, ImageBackground } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import MainInfo from "../components/MainInfo";
import Tabbar from "../components/TabBar";
import { moderateScale } from "react-native-size-matters";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode='cover'
        style={styles.backgroung}
      >
        <ScreenWrapper>
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              marginHorizontal: moderateScale(-16),
            }}
          >
            <View style={{ marginTop: moderateScale(50) }}>
              <MainInfo
                city={"Monreal"}
                currentTemp='19'
                weather='Mostly Clear'
              />
            </View>

            <Tabbar />
          </View>
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
