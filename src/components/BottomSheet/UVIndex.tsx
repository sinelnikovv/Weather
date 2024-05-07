import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import Range from "../DetailsItem/Range";
import { moderateScale } from "react-native-size-matters";

type Props = {
  value: number;
};

const UVIndex = ({ value }: Props) => {
  const index = value.toString();
  let UVText;
  if (value < 3) {
    UVText = "Low";
  } else if (value < 6) {
    UVText = "Moderate";
  } else if (value < 8) {
    UVText = "High";
  } else if (value < 11) {
    UVText = "Very high";
  } else if (value >= 11) {
    UVText = "Extreme";
  } else {
    UVText = "Moderate";
  }
  const rangeValue = (value / 11) * 100;
  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>UV INDEX</DetailTitle>
      <DetailText>{index}</DetailText>
      <DetailText style={{ marginBottom: moderateScale(10) }}>
        {UVText}
      </DetailText>
      <Range value={rangeValue} />
    </DetailContainer>
  );
};

export default UVIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: moderateScale(20),
  },
  text: {
    marginBottom: moderateScale(10),
  },
});
