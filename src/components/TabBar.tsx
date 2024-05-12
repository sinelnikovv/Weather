import { TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import TabBarBackground from "../assets/svg/tabBarBackground.svg";
import PlusButton from "../assets/svg/PlusButton.svg";
import LocationIcon from "../assets/svg/Location.svg";
import ListIcon from "../assets/svg/List.svg";

type Props = {
  navigation: any;
  getCurrentLocation: () => void;
};

const Tabbar = ({ navigation, getCurrentLocation }: Props) => {
  return (
    <View style={{ height: 100, zIndex: 2 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: moderateScale(32),
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => getCurrentLocation()}>
          <LocationIcon />
        </TouchableOpacity>
        <TouchableOpacity style={{ bottom: moderateScale(8) }}>
          <PlusButton />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
          <ListIcon />
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", zIndex: -1 }}>
        <TabBarBackground height={moderateScale(100)} />
      </View>
    </View>
  );
};

export default Tabbar;
