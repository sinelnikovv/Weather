import { Text } from "react-native";
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
  // lineheight?: number;
  children: string | string[];
  // height?: number;
};
const TextCustom = ({
  family = "Signika-Regular",
  size = 16,
  color = colors.primary,
  textAlign = "center",
  // lineheight = 1.2 * size,
  children,
  // height,
}: Props) => {
  return (
    <Text
      style={{
        fontFamily: family,
        fontSize: moderateScale(size),
        color: color,
        textAlign: textAlign,
        // lineHeight: moderateScale(lineheight),
        // height: height,
      }}
    >
      {children}
    </Text>
  );
};

export default TextCustom;
