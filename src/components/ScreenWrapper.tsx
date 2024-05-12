import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { gradient } from "../utils/theme";

type Props = {
  children: JSX.Element[] | JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  isGradient?: boolean;
};
const ScreenWrapper = ({
  children,
  containerStyle,
  isGradient = true,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      style={{ flex: 1 }}
      {...(isGradient ? gradient.bgGradient : gradient.emptyGradient)}
    >
      <View
        style={[
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            flex: 1,
            position: "relative",
          },
          containerStyle,
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

export default ScreenWrapper;
