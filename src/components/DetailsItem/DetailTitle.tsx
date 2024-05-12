import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import TextCustom from "../TextCustom";
import { colors } from "../../utils/theme";
import { moderateScale } from "react-native-size-matters";

type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
};

const DetailTitle = ({ children, style }: Props) => {
  return (
    <TextCustom
      textAlign='left'
      color={colors.greyDark}
      size={18}
      style={[styles.container, style]}
    >
      {children}
    </TextCustom>
  );
};

export default DetailTitle;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(12),
  },
});
