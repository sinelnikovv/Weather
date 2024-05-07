import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import { moderateScale } from "react-native-size-matters";

type Props = {
  humidity: number;
  dew: number;
};
const Humidity = ({ humidity, dew }: Props) => {
  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>HUMIDITY</DetailTitle>
      <DetailText style={styles.second}>{`${humidity}%`}</DetailText>
      <DetailText style={styles.subtext}>
        {`The dew point is ${Math.round(dew).toString()} right now`}
      </DetailText>
    </DetailContainer>
  );
};

export default Humidity;

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
