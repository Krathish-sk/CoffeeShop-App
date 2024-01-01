import { View, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

import { COLORS } from "../theme/theme";

export default function PopUpAnimation({ style, source }) {
  return (
    <View style={styles.LAContainer}>
      <LottieView autoPlay style={style} source={source} loop={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  LAContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: "center",
  },
});
