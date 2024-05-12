import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Svg, { Circle, Defs, Line, Mask, Path, Rect } from "react-native-svg";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import TextCustom from "../TextCustom";
import DetailText from "../DetailsItem/DetailText";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetWeatherQuery } from "../../store/reducers/weatherAPI";
import { formatUnixTime } from "../../utils/formatTime";

const Sunrise = () => {
  const [width, setWidth] = useState<number>(100);

  const selectedWeather = useSelector(
    (state: RootState) => state.selectedWeather,
  );
  const location = useSelector((state: RootState) => state.location);
  const { data } = useGetWeatherQuery(location);

  const interpolateTime = (
    currentTime: number,
    sunriseTime: number,
    sunsetTime: number,
  ) => {
    const normalizedTime =
      (currentTime - sunriseTime) / (sunsetTime - sunriseTime);

    const interpolatedValue = normalizedTime * (90 - -90) + -90;

    return interpolatedValue;
  };

  const currentTimeUnix = selectedWeather.dt;
  const sunriseTimeUnix = selectedWeather.sunrise;
  const sunsetTimeUnix = selectedWeather.sunset;

  const value = interpolateTime(
    currentTimeUnix,
    sunriseTimeUnix,
    sunsetTimeUnix,
  );

  const path = () => {
    let d = "";
    for (let i = -180; i <= 180; i++) {
      const x = (i + 180) * (width / 360);
      const y = 50 * (1 - Math.cos((i * Math.PI) / 180)) * (50 / 100);
      d += `${i === -180 ? "M" : "L"} ${x},${y} `;
    }
    return d;
  };

  const dotX = (value + 180) * (width / 360);
  const dotY = 25 * (1 - Math.cos((value * Math.PI) / 180));

  const sunriseTime = formatUnixTime(
    selectedWeather.sunrise,
    data.timezone_offset,
  );

  const sunsetTime = formatUnixTime(
    selectedWeather.sunset,
    data.timezone_offset,
  );

  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>Sunrise</DetailTitle>
      <DetailText>{sunriseTime}</DetailText>
      <View
        style={styles.svgContainer}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <Svg height={50} width={width} viewBox={`0 -10 ${width} 60`}>
          <Defs>
            <Mask id='maskAbove' x='0' y='0' height='25' width={width}>
              <Rect x='0' y='0' height='25' width={width} fill='white' />
            </Mask>
            <Mask id='maskBelow' x='0' y='25' height='25' width={width}>
              <Rect x='0' y='25' height='25' width={width} fill='white' />
            </Mask>
          </Defs>
          <Path
            d={path()}
            stroke='white'
            strokeWidth='3'
            fill='none'
            mask='url(#maskAbove)'
          />
          <Path
            d={path()}
            stroke='gray'
            strokeWidth='3'
            fill='none'
            mask='url(#maskBelow)'
          />

          <Line
            x1='0'
            y1='25'
            x2={width}
            y2='25'
            stroke='white'
            strokeWidth='1'
          />
          <Circle
            cx={dotX}
            cy={dotY}
            r='10'
            fill={value > -90 && value < 90 ? "#fff" : "#adacac"}
          />
        </Svg>
      </View>
      <TextCustom textAlign='left'>Sunset: {sunsetTime}</TextCustom>
    </DetailContainer>
  );
};

export default Sunrise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  svgContainer: {
    marginHorizontal: -moderateScale(16),
    marginBottom: moderateScale(10),
  },
  text: {
    marginBottom: moderateScale(10),
  },
});