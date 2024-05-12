import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { gradient } from "../../utils/theme";

type Props = {
  value?: number;
};

const Range = ({ value = 0 }: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient {...gradient.rangeGradient} style={styles.line} />
      <View style={[styles.dot, { left: `${value}%` }]} />
    </View>
  );
};

export default Range;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  line: {
    width: "100%",
    height: 6,
    borderRadius: 3,
  },
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
