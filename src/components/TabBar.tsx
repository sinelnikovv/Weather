import { Pressable, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import TabBarBackground from "../assets/svg/tabBarBackground.svg";
import PlusButton from "../assets/svg/PlusButton.svg";
import LocationIcon from "../assets/svg/Location.svg";
import ListIcon from "../assets/svg/List.svg";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/reducers/locationSlice";

const Tabbar = ({ navigation }) => {
  const dispatch = useDispatch();

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync();
        dispatch(
          setLocation({
            lat: currentLocation.coords.latitude,
            lon: currentLocation.coords.longitude,
          }),
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  return (
    <View style={{ height: moderateScale(100), zIndex: 2 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: moderateScale(32),
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => getLocation()}>
          <LocationIcon />
        </Pressable>
        <Pressable style={{ bottom: moderateScale(8) }}>
          <PlusButton />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Cities")}>
          <ListIcon />
        </Pressable>
      </View>
      <View style={{ position: "absolute", zIndex: -1 }}>
        <TabBarBackground height={moderateScale(100)} />
      </View>
    </View>
  );
};

export default Tabbar;
