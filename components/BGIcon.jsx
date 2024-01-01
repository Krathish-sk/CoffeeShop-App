import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BORDERRADIUS, SPACING } from "../theme/theme";

export default function BGIcon({ name, color, size, BGColor }) {
  return (
    <View style={[styles.IconBG, { backgroundColor: BGColor }]}>
      <Ionicons name={name} color={color} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDERRADIUS.radius_8,
  },
});
