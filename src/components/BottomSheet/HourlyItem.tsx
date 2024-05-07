import { View, StyleSheet } from "react-native";
import TextCustom from "../TextCustom";
import WeatherIconPicker from "../WeatherIconPicker";
import colors from "../../utils/theme";
import { moderateScale } from "react-native-size-matters";
import { useGetWeatherQuery } from "../../store/reducers/weatherAPI";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import moment from "moment";

type Props = {
  temp: number;
  code: string;
  time: number;
  isDay: boolean;
};
const HourlyItem = ({ temp, code, time, isDay }: Props) => {
  const location = useSelector((state: RootState) => state.location);
  const { data } = useGetWeatherQuery(location);

  const unixTimestamp = time;
  const timezoneOffset = data.timezone_offset;

  const timestampInMilliseconds = +unixTimestamp * 1000;
  const localTime = moment
    .utc(timestampInMilliseconds)
    .add(timezoneOffset, "seconds");
  const formattedTime = localTime.format("HH:mm");

  const nowLocal = moment.utc().add(timezoneOffset, "seconds");

  const isNow = nowLocal.isSame(localTime, "hour");

  const selectedWeather = useSelector(
    (state: RootState) => state.selectedWeather,
  );

  const isSelected = selectedWeather.dt === time;
  return (
    <View
      style={[styles.container, isSelected && { backgroundColor: colors.blue }]}
    >
      <TextCustom
        family='Signika-SemiBold'
        size={15}
        style={{ marginBottom: moderateScale(12) }}
      >
        {isNow ? "Now" : formattedTime}
      </TextCustom>
      <WeatherIconPicker size={32} code={code} isDay={isDay} />
      <TextCustom
        family='Signika-SemiBold'
        size={15}
        style={{ marginTop: moderateScale(16) }}
      >
        {Math.round(temp).toString()}&deg;
      </TextCustom>
    </View>
  );
};

export default HourlyItem;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(60),
    alignSelf: "flex-start",
    alignItems: "center",
    marginRight: moderateScale(12),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(9),
    backgroundColor: colors.purple20,
    borderRadius: moderateScale(100),
    borderColor: colors.white20,
    borderWidth: moderateScale(1),
  },
});
