import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import CoffeeCard from "../components/CoffeeCard";
import { addToCart, calculatePrice } from "../features/contentSlice";

function getCategoriesFromData(data) {
  let temp = {};

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i]?.name] == "") {
      temp[data[i]].name = 1;
    } else {
      temp[data[i]?.name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}

function getCoffeeList(category, data) {
  if (category === "All") {
    return data;
  } else {
    let coffeeList = data.filter((item) => item.name === category);
    return coffeeList;
  }
}

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { CoffeeList, BeansList } = useSelector((state) => state.mainData);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );

  const tabBarHeight = useBottomTabBarHeight();

  const listRef = useRef(0);

  // Search User input text
  function searchCoffee(userText) {
    if (userText !== "") {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });

      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeList.filter((item) =>
          item.name.toLowerCase().includes(userText.toLowerCase())
        ),
      ]);
    } else {
      return;
    }
  }

  // Reset User input text
  function resetSearchCoffee() {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });

    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
    setSearchText("");
  }

  // Add to cart handler

  function addToCartHandler({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }) {
    const cartItem = {
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    };
    dispatch(addToCart({ cartItem }));
    dispatch(calculatePrice());
    ToastAndroid.showWithGravity(
      `${name} has been added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        {/* Header */}
        <HeaderBar title={"Home"} />
        <Text style={styles.screenTitle}>
          Find the best {"\n"}coffee for you
        </Text>

        {/* Search input */}
        <View style={styles.inputContainerComponent}>
          {/* Search Icon */}
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <Ionicons
              style={styles.inputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>

          {/* User input */}
          <TextInput
            placeholder="Find your coffee..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
            inputMode="text"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              searchCoffee(searchText);
            }}
          />

          {/* Close Icon */}
          {searchText.length > 0 && (
            <TouchableOpacity onPress={resetSearchCoffee}>
              <Ionicons
                name="close"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_18}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}
        >
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.categoryScrollViewContainer}
            >
              <TouchableOpacity
                onPress={() => {
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({ index, category: categories[index] });
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}
                style={styles.categoryScrollViewItem}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index === index && {
                      color: COLORS.primaryOrangeHex,
                    },
                  ]}
                >
                  {data}
                </Text>
                {categoryIndex.index === index && (
                  <View style={styles.activeCategory} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}
        <FlatList
          ref={listRef}
          data={sortedCoffee}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.categoryText}>No Coffee Available</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Details", {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}
            >
              <CoffeeCard
                id={item.id}
                index={item.index}
                name={item.name}
                type={item.type}
                average_rating={item.average_rating}
                imagelink_square={item.imagelink_square}
                price={item.prices[2]}
                rosted={item.rosted}
                special_ingredient={item.special_ingredient}
                butttonPressHandler={addToCartHandler}
              />
            </TouchableOpacity>
          )}
        />
        <Text style={styles.coffeeBeanTitle}>Coffee Beans</Text>
        <FlatList
          data={BeansList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatListContainer,
            { marginBottom: tabBarHeight },
          ]}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Details", {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}
              >
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  index={item.index}
                  price={item.prices[2]}
                  rosted={item.rosted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  butttonPressHandler={addToCartHandler}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    padding: SPACING.space_30,
  },
  inputContainerComponent: {
    margin: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: "center",
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  emptyListContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_36 * 3.6,
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
  },
  coffeeBeanTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex,
  },
});
