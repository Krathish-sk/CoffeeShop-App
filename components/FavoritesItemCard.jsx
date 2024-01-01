import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ImageBackgroundInfo from "./ImageBackgroundInfo";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

export default function FavoritesItemCard({
  id,
  name,
  imagelink_portrait,
  special_ingredient,
  type,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  description,
  favourite,
  toggleFavouriteItem,
}) {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo
        enableBackHandler={false}
        average_rating={average_rating}
        favourite={favourite}
        id={id}
        imagelink_portrait={imagelink_portrait}
        ingredients={ingredients}
        name={name}
        ratings_count={ratings_count}
        roasted={roasted}
        special_ingredient={special_ingredient}
        toggleFavourite={toggleFavouriteItem}
        type={type}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.containerLG}
      >
        <Text style={styles.title}>Description</Text>
        <Text style={styles.text}>{description}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  containerLG: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  text: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
