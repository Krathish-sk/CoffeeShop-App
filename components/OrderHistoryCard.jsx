import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import OrderItemCard from "./OrderItemCard";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";

export default function OrderHistoryCard({
  navigationHandler,
  cartList,
  cartListPrice,
  orderDate,
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerTitle}>Order Time</Text>
          <Text style={styles.headerSubtitle}>{orderDate}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerPrice}>₹ {cartListPrice}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {cartList.map((data, index) => (
          <TouchableOpacity
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}
            key={index.toString() + data.id}
          >
            <OrderItemCard
              type={data.type}
              ItemPrice={data.ItemPrice}
              imagelink_square={data.imagelink_square}
              name={data.name}
              prices={data.prices}
              special_ingredient={data.special_ingredient}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    gap: SPACING.space_10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  headerSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  headerPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  listContainer: {
    gap: SPACING.space_20,
  },
});
