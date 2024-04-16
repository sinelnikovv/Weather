import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../utils/theme";
import { fetchCoordinates } from "../store/reducers/geocodingSlice";
import { useAppDispatch } from "../store";
import SearchIcon from "../assets/svg/search.svg";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const debouncedSearch = useCallback(
    debounce((text) => {
      dispatch(fetchCoordinates(text));
    }, 500),
    [],
  );

  const handleGetCoordinates = (text) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <LinearGradient
      colors={["#2E335A", "#1C1B33", "#2E335A"]}
      start={{ x: 0.5, y: 2 }}
      end={{ x: 0.5, y: -1 }}
      style={styles.inputContainer}
    >
      <SearchIcon width={moderateScale(16)} height={moderateScale(16)} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleGetCoordinates(text)}
        value={search}
        placeholder='Search for a city or airport'
        placeholderTextColor={colors.greyDark}
      />
    </LinearGradient>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(7),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  input: {
    marginLeft: moderateScale(5),
    color: colors.white,
  },
});
