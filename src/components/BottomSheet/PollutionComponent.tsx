import { StyleSheet, View } from "react-native";
import TextCustom from "../TextCustom";
import { moderateScale } from "react-native-size-matters";
import Range from "../DetailsItem/Range";

type Props = {
  value: number;
  name: string;
  range: number;
  quality: string;
  maxValue: number;
  indexNum?: number;
};

const PollutionComponent = ({
  value,
  name,
  range,
  quality,
  maxValue,
  indexNum,
}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TextCustom
            family='Signika-Bold'
            size={16}
            style={{
              fontWeight: "bold",
            }}
          >
            {name}
          </TextCustom>
          {indexNum ? (
            <TextCustom
              style={{ verticalAlign: "top", top: 4 }}
              size={12}
              family='Signika-Bold'
            >
              {indexNum}
            </TextCustom>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: moderateScale(140),
          }}
        >
          <TextCustom
            textAlign='left'
            size={16}
            style={{
              marginHorizontal: moderateScale(10),
            }}
          >
            {value}
          </TextCustom>
          <TextCustom
            textAlign='left'
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginRight: moderateScale(10),
            }}
          >
            - {maxValue.toString()}
          </TextCustom>
        </View>
        <View style={{ width: moderateScale(50), justifyContent: "flex-end" }}>
          <TextCustom
            textAlign='right'
            style={{ fontSize: 16, fontWeight: "bold" }}
          >
            {quality}
          </TextCustom>
        </View>
      </View>
      <View style={{ marginVertical: moderateScale(10) }}>
        <Range value={range} />
      </View>
    </View>
  );
};

export default PollutionComponent;

const styles = StyleSheet.create({
  container: { borderBottomWidth: 1, borderBottomColor: "grey" },
});
