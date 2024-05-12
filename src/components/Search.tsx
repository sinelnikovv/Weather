import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors, gradient } from "../utils/theme";
import { fetchCoordinates } from "../store/reducers/geocodingSlice";
import { useAppDispatch } from "../store";
import SearchIcon from "../assets/svg/search.svg";
import { useCallback } from "react";
import { debounce } from "lodash";

type Props = {
  search: string;
  setSearch: (text: string) => void;
};

const Search = ({ search, setSearch }: Props) => {
  const dispatch = useAppDispatch();

  const debouncedSearch = useCallback(
    debounce((text) => {
      dispatch(fetchCoordinates(text));
    }, 500),
    [],
  );

  const handleGetCoordinates = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <LinearGradient {...gradient.searchGradient} style={styles.inputContainer}>
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
