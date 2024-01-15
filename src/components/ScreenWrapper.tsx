import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
type Props = {
  children: JSX.Element[] | JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
};
const ScreenWrapper = ({ children, containerStyle }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          marginTop: insets.top,
          marginBottom: insets.bottom,
          paddingHorizontal: moderateScale(16),
          flex: 1,
        },
        containerStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenWrapper;
