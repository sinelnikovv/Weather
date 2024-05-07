import { View, StyleSheet, Modal } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  isShow: boolean;
  children: JSX.Element[] | JSX.Element;
};

export const ModalView: React.FC<Props> = ({ isShow = false, children }) => {
  const animatedOpacity = useAnimatedStyle(() => {
    let opacity = 0;
    if (isShow) opacity = withTiming(1, { duration: 300 });
    return {
      opacity: opacity,
    };
  });

  return (
    <Modal transparent={true} visible={isShow}>
      <Animated.View
        style={[animatedOpacity, { width: "100%", height: "100%" }]}
      >
        <BlurView style={styles.absoluteContainer} />
        <View style={styles.centeredView}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  absoluteContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  modalView: {
    justifyContent: "center",
    zIndex: 10,
    width: "100%",
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    alignItems: "center",
  },
});
