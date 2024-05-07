import { StyleProp, TextStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../utils/theme";
import Animated from "react-native-reanimated";
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
  color = colors.white,
  textAlign = "center",
  children,
  style,
}: Props) => {
  return (
    <Animated.Text
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
    </Animated.Text>
  );
};

export default TextCustom;
