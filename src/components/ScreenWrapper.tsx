import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: JSX.Element[] | JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  gradient?: boolean;
};
const ScreenWrapper = ({
  children,
  containerStyle,
  gradient = true,
}: Props) => {
  const insets = useSafeAreaInsets();

  const gradientColor = {
    colors: ["rgb(46,51,90)", "rgb(28,27,51)"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  };
  return (
    <LinearGradient
      style={{ flex: 1 }}
      {...(gradient
        ? { ...gradientColor }
        : {
            colors: ["transparent", "transparent"],
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
          })}
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
