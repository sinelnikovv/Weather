import { StyleSheet, View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Home</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
