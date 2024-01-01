import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import {
  calculatePrice,
  decementCartItemQuantity,
  incrementCartItemQuantity,
} from "../features/contentSlice";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import CartItem from "../components/CartItem";

export default function CartScreen({ navigation }) {
  const { CartList: cartList, CartPrice: cartPrice } = useSelector(
    (state) => state.mainData
  );

  const dispatch = useDispatch();
  const tabBarHeight = useBottomTabBarHeight();

  // Navigate to payment screen on Pay button press
  function pressPaymentHandler() {
    navigation.push("Payment", { amount: cartPrice });
  }

  // Handle increment quantity
  function incrementCartItemQuantityHandler(id, size) {
    dispatch(incrementCartItemQuantity({ id, size }));
    dispatch(calculatePrice());
  }

  // Handle decrement quantity
  function decrementCartItemQuantityHandler(id, size) {
    dispatch(decementCartItemQuantity({ id, size }));
    dispatch(calculatePrice());
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={COLORS.primaryBlackHex}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View
          style={[styles.scrollVeiwInnerView, { marginBottom: tabBarHeight }]}
        >
          {/* Header with Items */}

          <View style={styles.itemContainer}>
            <HeaderBar title="Cart" />
            {cartList.length === 0 ? (
              <EmptyListAnimation title={"Cart is Empty"} />
            ) : (
              <View style={styles.listItemContainer}>
                {cartList.map((data) => {
                  return (
                    <TouchableOpacity
                      key={data.id}
                      onPress={() => {
                        navigation.navigate("Details", {
                          type: data.type,
                          index: data.index,
                        });
                      }}
                    >
                      <CartItem
                        id={data.id}
                        name={data.name}
                        imagelink_square={data.imagelink_square}
                        prices={data.prices}
                        roasted={data.roasted}
                        type={data.type}
                        special_ingredient={data.special_ingredient}
                        decrementCartItemQuantityHandler={
                          decrementCartItemQuantityHandler
                        }
                        incrementCartItemQuantityHandler={
                          incrementCartItemQuantityHandler
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Payment Conatiner */}
          {cartList.length !== 0 && (
            <PaymentFooter
              buttonPressHAndler={pressPaymentHandler}
              buttonTitle={"Pay"}
              price={{ price: cartPrice }}
            />
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
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollVeiwInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
