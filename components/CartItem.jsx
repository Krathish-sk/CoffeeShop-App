import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

export default function CartItem({
  id,
  name,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
  imagelink_square,
  special_ingredient,
}) {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemLG}
        >
          <View style={styles.cartItemRow}>
            <Image source={imagelink_square} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <View>
                <Text style={styles.cartItemTitle}>{name}</Text>
                <Text style={styles.cartItemSubtitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.cartItemRoastedContainer}>
                <Text style={styles.cartItemRoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          {prices.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.cartItemSizeRowContainer}
            >
              <View style={styles.cartItemSizeValueContainer}>
                <View style={styles.sizeBox}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          type === "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}
                  >
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.sizeCurrency}>
                  ₹ <Text style={styles.sizePrice}>{data.price}</Text>
                </Text>
              </View>
              <View style={styles.cartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.cartItemIcon}
                  onPress={() =>
                    decrementCartItemQuantityHandler(id, data.size)
                  }
                >
                  <Entypo
                    name="minus"
                    size={FONTSIZE.size_14}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
                <View style={styles.cartItemQuantityContainer}>
                  <Text style={styles.cartItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cartItemIcon}
                  onPress={() =>
                    incrementCartItemQuantityHandler(id, data.size)
                  }
                >
                  <Entypo
                    name="add-to-list"
                    size={FONTSIZE._14}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemSingleLG}
        >
          <View style={styles.cartItemRow}>
            <Image
              source={imagelink_square}
              style={styles.cartItemSingleImage}
            />
          </View>
          <View style={styles.cartItemSingleInfoContainer}>
            <View>
              <Text style={styles.cartItemTitle}>{name}</Text>
              <Text style={styles.cartItemSubtitle}>{special_ingredient}</Text>
            </View>
            <View style={styles.cartItemSingleSizeValueContainer}>
              <View style={styles.sizeBox}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        type === "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16,
                    },
                  ]}
                >
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.sizeCurrency}>
                ₹ <Text style={styles.sizePrice}>{prices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.cartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.cartItemIcon}
                onPress={() =>
                  decrementCartItemQuantityHandler(id, prices[0].size)
                }
              >
                <Entypo
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_14}
                />
              </TouchableOpacity>
              <View style={styles.cartItemQuantityContainer}>
                <Text style={styles.cartItemQuantityText}>
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.cartItemIcon}
                onPress={() =>
                  incrementCartItemQuantityHandler(id, prices[0].size)
                }
              >
                <Entypo
                  name="add-to-list"
                  size={FONTSIZE.size_14}
                  color={COLORS.primaryWhiteHex}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartItemLG: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemRow: {
    flexDirection: "row",
    gap: SPACING.space_12,
    flex: 1,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  cartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: "space-between",
  },
  cartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  cartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  cartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  cartItemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  cartItemSizeRowContainer: {
    flex: 1,
    alignItems: "center",
    gap: SPACING.space_20,
    flexDirection: "row",
    justifyContent: "center",
  },
  cartItemSizeValueContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  sizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  cartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  cartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 70,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    paddingVertical: SPACING.space_4,
  },
  cartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  cartItemSingleLG: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  cartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
  },
  cartItemSingleSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cartItemSingleQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});