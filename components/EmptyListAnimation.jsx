import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS, FONTFAMILY, FONTSIZE } from "../theme/theme";

export default function EmptyListAnimation({ title }) {
  return (
    <View style={styles.emptyContainer}>
      {/* <LottieView
        style={styles.lottieStyle}
        source={require("../lottie/coffeecup.json")}
        autoPlay
        loop
      /> */}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  lottieStyle: {
    height: 300,
  },
  text: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: "center",
  },
});
