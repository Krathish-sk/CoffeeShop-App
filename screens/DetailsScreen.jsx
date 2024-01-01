import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import {
  addToFavouritesList,
  deleteFromFavouritesList,
  addToCart,
  calculatePrice,
} from "../features/contentSlice";
import PaymentFooter from "../components/PaymentFooter";

export default function DetailsScreen({ navigation, route }) {
  const { type, index } = route.params;
  let itemOfIndex;
  if (type === "Coffee") {
    itemOfIndex = useSelector((state) => state.mainData.CoffeeList[index]);
  } else {
    itemOfIndex = useSelector((state) => state.mainData.BeansList[index]);
  }
  const dispatch = useDispatch();

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  function backHandler() {
    navigation.pop();
  }

  function toggleFavourite(favourite, type, id) {
    if (favourite === true) {
      dispatch(deleteFromFavouritesList({ id, type }));
    } else {
      dispatch(addToFavouritesList({ id, type }));
    }
  }

  function addToCartHandler({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
    title,
  }) {
    const cartItem = {
      id,
      index,
      name,
      roasted,
      title,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    };
    dispatch(addToCart({ cartItem }));
    dispatch(calculatePrice());
    navigation.navigate("Cart");
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView contentContainerStyle={styles.scrollViewFlex}>
        {/* Image Container */}
        <ImageBackgroundInfo
          enableBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          title={itemOfIndex.title}
          id={itemOfIndex.id}
          favourite={itemOfIndex.favourite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          backHandler={backHandler}
          toggleFavourite={toggleFavourite}
        />

        {/* Description and Size Container */}

        <View style={styles.footerInArea}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc((prev) => !prev)}
            >
              <Text style={styles.descriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc((prev) => !prev)}
            >
              <Text numberOfLines={3} style={styles.descriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}

          <Text style={styles.infoTitle}>Size</Text>
          <View style={styles.sizeOuterContainer}>
            {itemOfIndex.prices.map((data) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.sizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        itemOfIndex.type === "Bean"
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Container */}
        <PaymentFooter
          price={price}
          buttonTitle={"Add To Cart"}
          buttonPressHAndler={() => {
            addToCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              name: itemOfIndex.name,
              title: itemOfIndex.title,
              roasted: itemOfIndex.roasted,
              imagelink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              type: itemOfIndex.type,
              price: price,
            });
          }}
        />
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
    justifyContent: "space-between",
  },
  footerInArea: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
