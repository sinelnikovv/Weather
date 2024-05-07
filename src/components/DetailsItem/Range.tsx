import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

type Props = {
  value?: number;
};

const Range = ({ value = 0 }: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0e00fe", "#ff0000"]}
        start={{ x: 0, y: 0 }}
        locations={[0.35, 1]}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      />
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
