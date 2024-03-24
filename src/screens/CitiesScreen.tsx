import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Back from "../assets/svg/back.svg";
import TextCustom from "../components/TextCustom";
import { moderateScale } from "react-native-size-matters";

const CitiesScreen = ({ navigation }) => {
  return (
    <ScreenWrapper containerStyle={{ marginHorizontal: moderateScale(16) }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <TextCustom
          style={{ marginLeft: moderateScale(5) }}
          textAlign='left'
          size={28}
        >
          Cities
        </TextCustom>
        <View>
          <View>
            <TextCustom>20</TextCustom>
          </View>
        </View>
      </View>
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
