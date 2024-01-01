import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import {
  calculatePrice,
  addToOrderHistoryListFromCart,
} from "../features/contentSlice";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import PaymentFooter from "../components/PaymentFooter";
import GradientBGIcon from "../components/GradientBGIcon";
import { LinearGradient } from "expo-linear-gradient";
import PaymentsMethod from "../components/PaymentMethod";
import PopUpAnimation from "../components/PopUpAnimation";

const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Pay",
    icon: require("../assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("../assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];

export default function PaymentScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);

  function buttonPressHandler() {
    // setShowAnimation(true);
    dispatch(addToOrderHistoryListFromCart());
    dispatch(calculatePrice());
    setTimeout(() => {
      // setShowAnimation(false);
      navigation.navigate("History");
    }, 2000);
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle="light-content"
      />

      {/* Showing animation after successful payment */}
      {showAnimation && (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require("../lottie/successful.json")}
        />
      )}

      {/* Payment method container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        {/* Payment Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <GradientBGIcon
              name={"arrow-left"}
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE._20}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payments</Text>
          <View style={styles.emptyView} />
        </View>

        {/* Card Container */}
        <View style={styles.paymentOptionsContainer}>
          {/* Credit Card */}
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              style={[
                styles.creditCardContainer,
                {
                  borderColor:
                    paymentMode === "Credit Card"
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}
            >
              <Text style={styles.cerditCardTitle}>Credit Card</Text>
              <View style={styles.cerditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.LGStyle}
                >
                  <View style={styles.creditCardRow}>
                    <MaterialCommunityIcons
                      name="credit-card-chip-outline"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <Fontisto
                      name="visa"
                      size={FONTSIZE.size_30}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.creditCardNumberContainer}>
                    <Text style={styles.creditCardNumber}>3879</Text>
                    <Text style={styles.creditCardNumber}>8923</Text>
                    <Text style={styles.creditCardNumber}>6745</Text>
                    <Text style={styles.creditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardNameContainer}>
                      <Text style={styles.creditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.creditCardNameTitle}>
                        Manoj Tivari
                      </Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.creditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.creditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>

          {/* Other Payment Modes */}
          {PaymentList.map((data) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}
            >
              <PaymentsMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Payment Container */}
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        buttonPressHAndler={buttonPressHandler}
        price={{ price: route.params.amount }}
      />
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
  headerContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  emptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  paymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  creditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  cerditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  cerditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  LGStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  creditCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  creditCardNumberContainer: {
    flexDirection: "row",
    gap: SPACING.space_10,
    alignItems: "center",
  },
  creditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  creditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
  creditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  creditCardNameContainer: {
    alignItems: "flex-start",
  },
  creditCardDateContainer: {
    alignItems: "flex-end",
  },
});
