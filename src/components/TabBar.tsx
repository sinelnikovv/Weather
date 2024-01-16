import { Pressable, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import TabBarBackground from "../assets/svg/tabBarBackground.svg";
import PlusButton from "../assets/svg/PlusButton.svg";
import LocationIcon from "../assets/svg/Location.svg";
import ListIcon from "../assets/svg/List.svg";

const Tabbar = () => {
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
        <Pressable>
          <LocationIcon />
        </Pressable>
        <Pressable style={{ bottom: moderateScale(8) }}>
          <PlusButton />
        </Pressable>
        <Pressable>
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
