import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
type Props = {
  children: JSX.Element[] | JSX.Element;
};
const ScreenWrapper = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
        marginBottom: insets.bottom,
        paddingHorizontal: moderateScale(16),
      }}
    >
      {children}
    </View>
  );
};

export default ScreenWrapper;
