import { StyleSheet, View, ImageBackground, Text, Image } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import MainInfo from "../components/MainInfo";
import Tabbar from "../components/TabBar";
import { moderateScale } from "react-native-size-matters";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => [moderateScale(325), moderateScale(700)],
    [],
  );
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
                    borderColor: "#fff",
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
                      // backgroundColor: "red",
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
                    <Text>Awesome 🎉</Text>
                  </View>
                </BlurView>
              </BottomSheet>
            </View>
            <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <Tabbar />
            </View>
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
  containerSheet: {
    // flex: 1,
    // padding: 24,
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
