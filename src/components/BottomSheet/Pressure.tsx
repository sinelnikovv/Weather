import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import { moderateScale } from "react-native-size-matters";

type Props = {
  pressure: number;
};

const Pressure = ({ pressure }: Props) => {
  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>PRESSURE</DetailTitle>
      <DetailText style={styles.second}>{`${pressure}`}</DetailText>
    </DetailContainer>
  );
};

export default Pressure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: moderateScale(20),
  },
  text: {
    marginBottom: moderateScale(10),
  },
  second: {
    flex: 1,
  },
});
