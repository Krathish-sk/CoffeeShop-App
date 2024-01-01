import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import LinearGradientBGIcon from "./LinearGradientBGIcon";
import ProfilePic from "./ProfilePic";

export default function HeaderBar({ title }) {
  return (
    <View style={styles.headerContainer}>
      <LinearGradientBGIcon
        name={"menu"}
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePic />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: "white",
  },
});
