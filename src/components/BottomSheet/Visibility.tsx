import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import { moderateScale } from "react-native-size-matters";

type Props = {
  visibility: number;
};

const Visibility = ({ visibility }: Props) => {
  const distance = Math.round(visibility / 1000).toString();
  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>VISIBILITY</DetailTitle>
      <DetailText style={styles.second}>{`${distance} km`}</DetailText>
    </DetailContainer>
  );
};

export default Visibility;

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
