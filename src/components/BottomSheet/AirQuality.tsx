import { TouchableOpacity, View, StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import DetailText from "../DetailsItem/DetailText";
import Range from "../DetailsItem/Range";
import TextCustom from "../TextCustom";
import Chevron from "../../assets/svg/back.svg";
import { colors } from "../../utils/theme";
import { moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ModalView } from "./ModalView";
import Cross from "../../assets/svg/cross.svg";
import { useState } from "react";
import PollutionComponent from "./PollutionComponent";
import {
  aqiLevels,
  coLevels,
  getQuality,
  ozoneLevels,
  pm10Levels,
  so2Levels,
} from "../../utils/getAirQuality";

const AirQuality = () => {
  const [isShow, setIsShow] = useState(false);

  const selectedWeather = useSelector(
    (state: RootState) => state.selectedWeather,
  );
  const aqi = selectedWeather.pollution.main.aqi;

  const airText = getQuality(aqi, aqiLevels) || "Unknown";
  const CO = getQuality(selectedWeather.pollution.components.co, coLevels);
  const SO2 = getQuality(selectedWeather.pollution.components.so2, so2Levels);
  const PM10 = getQuality(
    selectedWeather.pollution.components.pm10,
    pm10Levels,
  );
  const ozone = getQuality(
    selectedWeather.pollution.components.o3,
    ozoneLevels,
  );

  return (
    <DetailContainer containerStyle={styles.container}>
      <ModalView isShow={isShow}>
        <View
          style={{
            position: "relative",
            padding: moderateScale(30),
            backgroundColor: colors.purple,
            borderRadius: moderateScale(20),
          }}
        >
          <TouchableOpacity
            onPress={() => setIsShow(false)}
            hitSlop={15}
            style={styles.closeButton}
          >
            <Cross width={moderateScale(10)} height={moderateScale(10)} />
          </TouchableOpacity>
          <View>
            <PollutionComponent
              name='CO'
              value={selectedWeather.pollution.components.co}
              maxValue={15400}
              range={(selectedWeather.pollution.components.co / 15400) * 100}
              quality={CO}
            />
            <PollutionComponent
              name='SO'
              indexNum={2}
              value={selectedWeather.pollution.components.so2}
              maxValue={350}
              range={(selectedWeather.pollution.components.so2 / 350) * 100}
              quality={SO2}
            />
            <PollutionComponent
              name='NO'
              indexNum={2}
              value={selectedWeather.pollution.components.no2}
              maxValue={200}
              range={(selectedWeather.pollution.components.no2 / 200) * 100}
              quality={SO2}
            />
            <PollutionComponent
              name='PM'
              indexNum={10}
              value={selectedWeather.pollution.components.pm10}
              maxValue={200}
              range={(selectedWeather.pollution.components.pm10 / 200) * 100}
              quality={PM10}
            />
            <PollutionComponent
              name='PM'
              indexNum={2.5}
              value={selectedWeather.pollution.components.pm2_5}
              maxValue={75}
              range={(selectedWeather.pollution.components.pm2_5 / 75) * 100}
              quality={PM10}
            />
            <PollutionComponent
              name='O'
              indexNum={3}
              value={selectedWeather.pollution.components.o3}
              maxValue={180}
              range={(selectedWeather.pollution.components.o3 / 180) * 100}
              quality={ozone}
            />
          </View>
        </View>
      </ModalView>
      <DetailTitle>AIR QUALITY</DetailTitle>
      <DetailText>{`${aqi.toString()} -  ${airText}`}</DetailText>
      <Range value={(aqi / 5) * 100} />
      <TouchableOpacity
        onPress={() => setIsShow(true)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderTopColor: colors.greyLight,
          paddingVertical: moderateScale(12),
        }}
      >
        <TextCustom size={18} textAlign='left'>
          See more
        </TextCustom>
        <View style={{ transform: [{ rotate: "180deg" }] }}>
          <Chevron />
        </View>
      </TouchableOpacity>
    </DetailContainer>
  );
};

export default AirQuality;

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(10),
  },
  closeButton: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
    zIndex: 10,
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
  },
});
