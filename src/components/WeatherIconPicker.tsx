import ClearDay from "../assets/weatherIcons/clear_day.svg";
import ClearNight from "../assets/weatherIcons/clear_night.svg";
import CloudsDay from "../assets/weatherIcons/clouds_day.svg";
import CloudsNight from "../assets/weatherIcons/clouds_night.svg";
import Clouds from "../assets/weatherIcons/clouds.svg";
import Fog from "../assets/weatherIcons/fog.svg";
import RainExtremeDay from "../assets/weatherIcons/rain_extreme_day.svg";
import RainExtremeNight from "../assets/weatherIcons/rain_extreme_night.svg";
import RainHeavyDay from "../assets/weatherIcons/rain_heavy_day.svg";
import RainHeavyNight from "../assets/weatherIcons/rain_heavy_night.svg";
import RainHeavy from "../assets/weatherIcons/rain_heavy.svg";
import RainLightDay from "../assets/weatherIcons/rain_light_day.svg";
import RainLightNight from "../assets/weatherIcons/rain_light_night.svg";
import RainLight from "../assets/weatherIcons/rain_light.svg";
import RainMediumDay from "../assets/weatherIcons/rain_medium_day.svg";
import RainMediumNight from "../assets/weatherIcons/rain_medium_night.svg";
import RainMedium from "../assets/weatherIcons/rain_medium.svg";
import SnowDay from "../assets/weatherIcons/snow_day.svg";
import SnowNight from "../assets/weatherIcons/snow_night.svg";
import SnowHeavyDay from "../assets/weatherIcons/snow_heavy_day.svg";
import SnowHeavyNight from "../assets/weatherIcons/snow_heavy_night.svg";
import ThunderstormDayHeavyRain from "../assets/weatherIcons/thunderstorm_day_heavy_rain.svg";
import ThunderstormDayLightRain from "../assets/weatherIcons/thunderstorm_day_light_rain.svg";
import ThunderstormDay from "../assets/weatherIcons/thunderstorm_day.svg";
import ThunderstormNightHeavyRain from "../assets/weatherIcons/thunderstorm_night_heavy_rain.svg";
import ThunderstormNightLightRain from "../assets/weatherIcons/thunderstorm_night_light_rain.svg";
import ThunderstormNight from "../assets/weatherIcons/thunderstorm_night.svg";
import Tornado from "../assets/weatherIcons/tornado.svg";
import { moderateScale } from "react-native-size-matters";

const WeatherIconPicker = ({
  code,
  isDay = true,
}: {
  code: string;
  isDay?: boolean;
}) => {
  let Icon;
  switch (code) {
    case "200":
      Icon = isDay ? ThunderstormDayLightRain : ThunderstormNightLightRain;
      break;
    case "201":
      Icon = isDay ? ThunderstormDayLightRain : ThunderstormNightLightRain;
      break;
    case "202":
      Icon = isDay ? ThunderstormDayHeavyRain : ThunderstormNightHeavyRain;
      break;
    case "210":
      Icon = isDay ? ThunderstormDay : ThunderstormNight;
      break;
    case "211":
      Icon = isDay ? ThunderstormDay : ThunderstormNight;
      break;
    case "212":
      Icon = isDay ? ThunderstormDay : ThunderstormNight;
      break;
    case "221":
      Icon = isDay ? ThunderstormDay : ThunderstormNight;
      break;
    case "230":
      Icon = isDay ? ThunderstormDayLightRain : ThunderstormNightLightRain;
      break;
    case "231":
      Icon = isDay ? ThunderstormDayLightRain : ThunderstormNightLightRain;
      break;
    case "232":
      Icon = isDay ? ThunderstormDayHeavyRain : ThunderstormNightHeavyRain;
      break;
    case "300":
      Icon = RainLight;
      break;
    case "301":
      Icon = RainMedium;
      break;
    case "302":
      Icon = RainHeavy;
      break;
    case "310":
      Icon = RainLight;
      break;
    case "311":
      Icon = RainMedium;
      break;
    case "312":
      Icon = RainHeavy;
      break;
    case "313":
      Icon = RainMedium;
      break;
    case "314":
      Icon = RainHeavy;
      break;
    case "321":
      Icon = RainMedium;
      break;
    case "500":
      Icon = isDay ? RainLightDay : RainLightNight;
      break;
    case "501":
      Icon = isDay ? RainMediumDay : RainMediumNight;
      break;
    case "502":
      Icon = isDay ? RainHeavyDay : RainHeavyNight;
      break;
    case "503":
      Icon = isDay ? RainExtremeDay : RainExtremeNight;
      break;
    case "504":
      Icon = isDay ? RainExtremeDay : RainExtremeNight;
      break;
    case "511":
      Icon = isDay ? RainExtremeDay : RainExtremeNight;
      break;
    case "520":
      Icon = isDay ? RainLightDay : RainLightNight;
      break;
    case "521":
      Icon = isDay ? RainHeavyDay : RainHeavyNight;
      break;
    case "522":
      Icon = isDay ? RainHeavyDay : RainHeavyNight;
      break;
    case "531":
      Icon = isDay ? RainHeavyDay : RainHeavyNight;
      break;
    case "600":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "601":
      Icon = isDay ? SnowHeavyDay : SnowHeavyNight;
      break;
    case "602":
      Icon = isDay ? SnowHeavyDay : SnowHeavyNight;
      break;
    case "611":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "612":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "613":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "615":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "616":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "620":
      Icon = isDay ? SnowDay : SnowNight;
      break;
    case "621":
      Icon = isDay ? SnowHeavyDay : SnowHeavyNight;
      break;
    case "622":
      Icon = isDay ? SnowHeavyDay : SnowHeavyNight;
      break;
    case "701":
      Icon = Fog;
      break;
    case "711":
      Icon = Fog;
      break;
    case "721":
      Icon = Fog;
      break;
    case "731":
      Icon = Fog;
      break;
    case "741":
      Icon = Fog;
      break;
    case "751":
      Icon = Fog;
      break;
    case "761":
      Icon = Fog;
      break;
    case "762":
      Icon = Fog;
      break;
    case "771":
      Icon = Fog;
      break;
    case "781":
      Icon = Tornado;
      break;
    case "800":
      Icon = isDay ? ClearDay : ClearNight;
      break;
    case "801":
      Icon = isDay ? CloudsDay : CloudsNight;
      break;
    case "802":
      Icon = isDay ? CloudsDay : CloudsNight;
      break;
    case "803":
      Icon = Clouds;
      break;
    case "804":
      Icon = Clouds;
      break;

    default:
      Icon = ClearDay;
  }
  return <Icon height={moderateScale(120)} width={moderateScale(120)} />;
};

export default WeatherIconPicker;
