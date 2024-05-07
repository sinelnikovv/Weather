import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import TextCustom from "../TextCustom";
import colors from "../../utils/theme";

type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
};

const DetailText = ({ children, style = {} }: Props) => {
  return (
    <TextCustom
      textAlign='left'
      color={colors.white}
      size={24}
      style={[styles.container, style]}
    >
      {children}
    </TextCustom>
  );
};

export default DetailText;

const styles = StyleSheet.create({
  container: {},
});
