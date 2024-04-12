import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Back from "../assets/svg/back.svg";
import TextCustom from "../components/TextCustom";
import { moderateScale } from "react-native-size-matters";
import CityItem from "../components/CityItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Search from "../assets/svg/search.svg";
import colors from "../utils/theme";
import {
  SearchResponce,
  fetchCoordinates,
} from "../store/reducers/geocodingSlice";

const mockData: SearchResponce[] = [
  { name: "New York", lat: "40.7128", lon: "-74.006" },
  { name: "London", lat: "51.5074", lon: "-0.1278" },
  { name: "Paris", lat: "48.8566", lon: "2.3522" },
  { name: "Tokyo", lat: "35.6895", lon: "139.6917" },
  { name: "Berlin", lat: "52.5200", lon: "13.4050" },
];

const CitiesScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const locations = useSelector(
    (state: RootState) => state.geocodingSlice.data,
  );
  const dispatch = useAppDispatch();

  const handleGetCoordinates = (text) => {
    setSearch(text);
    dispatch(fetchCoordinates(text));
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
      <LinearGradient
        colors={["#2E335A", "#1C1B33", "#2E335A"]}
        start={{ x: 0.5, y: 2 }}
        end={{ x: 0.5, y: -1 }}
        style={styles.inputContainer}
      >
        <Search width={moderateScale(16)} height={moderateScale(16)} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleGetCoordinates(text)}
          value={search}
          placeholder='Search for a city or airport'
          placeholderTextColor={colors.greyDark}
        />
      </LinearGradient>
      <FlatList
        data={search ? locations : mockData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CityItem item={item} />}
      />
    </ScreenWrapper>
  );
};

export default CitiesScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(7),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  input: { marginLeft: moderateScale(5), color: colors.white },
});
