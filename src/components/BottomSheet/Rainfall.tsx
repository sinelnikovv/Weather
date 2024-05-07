import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import { moderateScale } from "react-native-size-matters";

type Props = {
  rain: { "1h": number };
};

const Rainfall = ({ rain }: Props) => {
  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>RAINFALL</DetailTitle>
      <DetailText>{`${rain["1h"]} mm`}</DetailText>
      <DetailText style={styles.second}>in last hour</DetailText>
    </DetailContainer>
  );
};

export default Rainfall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: moderateScale(20),
  },
  text: {
    marginBottom: moderateScale(25),
  },
  second: {
    fontSize: moderateScale(18),
    flex: 1,
  },
});
