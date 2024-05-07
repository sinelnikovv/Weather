import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Back from "../assets/svg/back.svg";
import TextCustom from "../components/TextCustom";
import { moderateScale } from "react-native-size-matters";
import CityItem from "../components/CityItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { setLocation } from "../store/reducers/locationSlice";
import { RootStackNavigatorScreenProps } from "../navigation/RootNavigator";
import Search from "../components/Search";
import { SearchResponce } from "../types";

const mockData: SearchResponce[] = [
  { name: "New York", lat: "40.7128", lon: "-74.006" },
  { name: "London", lat: "51.5074", lon: "-0.1278" },
  { name: "Paris", lat: "48.8566", lon: "2.3522" },
  { name: "Tokyo", lat: "35.6895", lon: "139.6917" },
  { name: "Berlin", lat: "52.5200", lon: "13.4050" },
];
type Props = RootStackNavigatorScreenProps<"Cities">;

const CitiesScreen = ({ navigation }: Props) => {
  const locations = useSelector((state: RootState) => state.geocoding.data);
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.geocoding.status);
  const onPressCityHandler = async (item) => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=pk.0e1ce1fb5b5bcae2803eef081c2d6846&lat=${item.lat}&lon=${item.lon}&format=json`,
    ).then((res) => res.json());

    dispatch(
      setLocation({
        lat: response.lat,
        lon: response.lon,
        name: response.address.city,
      }),
    );
    navigation.navigate("Home");
  };
  return (
    <ScreenWrapper containerStyle={{ marginHorizontal: moderateScale(16) }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <TextCustom
          style={{
            marginLeft: moderateScale(5),
            marginBottom: moderateScale(20),
          }}
          textAlign='left'
          size={28}
        >
          Cities
        </TextCustom>
      </View>
      <Search />
      {isLoading === "loading" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <FlatList
          data={locations.length !== 0 ? locations : mockData}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressCityHandler(item)}>
              <CityItem item={item} />
            </TouchableOpacity>
          )}
        />
      )}
    </ScreenWrapper>
  );
};

export default CitiesScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
