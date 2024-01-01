import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

import HeaderBar from "../components/HeaderBar";
import PopUpAnimation from "../components/PopUpAnimation";
import EmptyListAnimation from "../components/EmptyListAnimation";
import OrderHistoryCard from "../components/OrderHistoryCard";

export default function OrderHistoryScreen({ navigation }) {
  const { OrderHistoryList: orderHistoryList, CartList } = useSelector(
    (state) => state.mainData
  );
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  function navigationHandler({ index, type, id }) {
    navigation.navigate("Details", {
      index,
      id,
      type,
    });
  }

  function buttonPressHandler() {}

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryBlackHex}
      />

      {showAnimation && (
        <PopUpAnimation
          style={styles.LA}
          source={require("../lottie/download.json")}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View
          style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.itemContainer}>
            <HeaderBar title={"Order History"} />

            {orderHistoryList.length === 0 ? (
              <EmptyListAnimation title={"No Order History to show"} />
            ) : (
              <View style={styles.listItemContainer}>
                {orderHistoryList.map((data, index) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    cartList={data.CartList}
                    cartListPrice={data.CartListPrice}
                    orderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {orderHistoryList.length > 0 && (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={buttonPressHandler}
            >
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LA: {
    height: 250,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },
  downloadButton: {
    width: 150,
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
