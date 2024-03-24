import { StyleProp, Text, TextStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../utils/theme";
type Props = {
  family?:
    | "Signika-Light"
    | "Signika-Regular"
    | "Signika-Medium"
    | "Signika-SemiBold"
    | "Signika-Bold";
  size?: number;
  color?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  children: string | string[];
  style?: StyleProp<TextStyle>;
};
const TextCustom = ({
  family = "Signika-Regular",
  size = 16,
  color = colors.primary,
  textAlign = "center",
  children,
  style,
}: Props) => {
  return (
    <Text
      style={[
        {
          fontFamily: family,
          fontSize: moderateScale(size),
          color: color,
          textAlign: textAlign,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextCustom;
