import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import { moderateScale } from "react-native-size-matters";

type Props = {
  temp: number;
  feelsLike: number;
};

const FeelsLike = ({ feelsLike, temp }: Props) => {
  let diffText = "";
  if (feelsLike - temp > 3) {
    diffText = "Warmer than actual temperature";
  } else if (feelsLike - temp < -3) {
    diffText = "Colder than actual temperature";
  } else {
    diffText = "Similar to the the actual temperature";
  }

  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>FEELS LIKE</DetailTitle>
      <DetailText style={styles.second}>
        {Math.round(feelsLike).toString()}
      </DetailText>
      <DetailText style={styles.subtext}>{diffText}</DetailText>
    </DetailContainer>
  );
};

export default FeelsLike;

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
  subtext: {
    fontSize: moderateScale(14),
  },
});
