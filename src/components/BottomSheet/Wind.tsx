import { StyleSheet } from "react-native";
import DetailContainer from "../DetailsItem/DetailContainer";
import DetailTitle from "../DetailsItem/DetailTitle";
import { moderateScale } from "react-native-size-matters";
import Svg, { Circle, Text, Line, G, Polygon } from "react-native-svg";

type Props = {
  speed: number;
  deg: number;
};

const Compass = ({ deg = 90, speed = 0 }) => {
  const size = 120;
  const radius = size / 2;
  const fontSize = size / 7;
  const dashSize = 5;
  const arrowLength = 120;
  const arrowHeadSize = 8;
  const circleRadius = 40;

  const dashes = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 360) / 36;
    const angleInRadians = (angle * Math.PI) / 180;
    const lineStartX = radius + radius * Math.cos(angleInRadians);
    const lineStartY = radius + radius * Math.sin(angleInRadians);
    const lineEndX = lineStartX - dashSize * Math.cos(angleInRadians);
    const lineEndY = lineStartY - dashSize * Math.sin(angleInRadians);
    return { lineStartX, lineStartY, lineEndX, lineEndY };
  });

  const arrowEndX = radius;
  const arrowEndY = radius - arrowLength / 2;
  const arrowHeadPoints = [
    `${arrowEndX},${arrowEndY}`,
    `${arrowEndX - arrowHeadSize},${arrowEndY + arrowHeadSize}`,
    `${arrowEndX + arrowHeadSize},${arrowEndY + arrowHeadSize}`,
  ].join(" ");

  return (
    <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
      <G stroke='white' strokeWidth='1'>
        {dashes.map((d, i) => (
          <Line
            key={i}
            x1={d.lineStartX}
            y1={d.lineStartY}
            x2={d.lineEndX}
            y2={d.lineEndY}
          />
        ))}
      </G>

      <Text
        x={radius}
        y={fontSize + 4}
        fontSize={fontSize}
        textAnchor='middle'
        fill='white'
      >
        N
      </Text>
      <Text
        x={radius}
        y={size - 8}
        fontSize={fontSize}
        textAnchor='middle'
        fill='white'
      >
        S
      </Text>
      <Text
        x={size - 12}
        y={radius + fontSize / 3}
        fontSize={fontSize}
        textAnchor='middle'
        fill='white'
      >
        E
      </Text>
      <Text
        x={0 + 12}
        y={radius + fontSize / 3}
        fontSize={fontSize}
        textAnchor='middle'
        fill='white'
      >
        W
      </Text>
      <Line
        x1={radius}
        y1={radius + arrowLength / 2}
        x2={arrowEndX}
        y2={arrowEndY}
        stroke='red'
        strokeWidth='2'
        rotation={deg}
        origin={`${radius},${radius}`}
      />
      <Polygon
        points={arrowHeadPoints}
        fill='red'
        rotation={deg}
        origin={`${radius},${radius}`}
      />
      <Circle
        cx={radius}
        cy={radius}
        r={circleRadius}
        fill='rgb(68, 48, 100)'
      />
      <Text
        x={radius}
        y={radius - fontSize / 2}
        fontSize={fontSize}
        textAnchor='middle'
        fill='white'
      >
        {speed.toFixed(0)}
      </Text>
      <Text
        x={radius}
        y={radius + fontSize / 2}
        fontSize={fontSize}
        textAnchor='middle'
        fill='white'
      >
        m\s
      </Text>
    </Svg>
  );
};

const Wind = ({ speed, deg }: Props) => {
  return (
    <DetailContainer containerStyle={styles.container}>
      <DetailTitle style={styles.text}>WIND</DetailTitle>
      <Compass speed={speed} deg={deg} />
    </DetailContainer>
  );
};

export default Wind;

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
