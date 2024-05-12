import { View, StyleSheet } from "react-native";
import { colors } from "../../utils/theme";
import { moderateScale } from "react-native-size-matters";

type Props = {
  children: JSX.Element[] | JSX.Element;
  containerStyle?: any;
};

const DetailContainer = ({ children, containerStyle }: Props) => {
  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

export default DetailContainer;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(170),
    justifyContent: "space-between",
    backgroundColor: colors.purple20,
    borderRadius: moderateScale(22),
    borderColor: colors.white20,
    borderWidth: 1,
    paddingHorizontal: moderateScale(16),
  },
});
