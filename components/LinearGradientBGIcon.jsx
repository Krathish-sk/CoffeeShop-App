import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

import { COLORS, SPACING } from "../theme/theme";

export default function LinearGradientBGIcon({ name, color, size }) {
  return (
    <View style={styles.conatiner}>
      <LinearGradient
        style={styles.LGbg}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Entypo name={name} size={size} color={color} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: COLORS.secondaryDarkGreyHex,
  },
  LGbg: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: "center",
    justifyContent: "center",
  },
});
