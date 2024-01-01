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
  addToFavouritesList,
  deleteFromFavouritesList,
} from "../features/contentSlice";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import CartItem from "../components/CartItem";
import FavoritesItemCard from "../components/FavoritesItemCard";

export default function FavoritesScreen({ navigation, route }) {
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const { FavouritesList: favouritesList } = useSelector(
    (state) => state.mainData
  );

  // Toggle Favourites
  function toggleFavourite(favourite, type, id) {
    if (favourite === true) {
      dispatch(deleteFromFavouritesList({ id, type }));
    } else {
      dispatch(addToFavouritesList({ id, type }));
    }
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar
        backgroundColor={COLORS.primaryBlackHex}
        barStyle="light-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          {/* Header with items */}
          <View style={styles.itemContainer}>
            <HeaderBar title={"My Collections"} />
            {favouritesList.length === 0 ? (
              <EmptyListAnimation title={"No Favourites yet!!"} />
            ) : (
              <View style={styles.listItemContainer}>
                {favouritesList.map((data) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.navigate("Details", {
                        type: data.type,
                        index: data.index,
                      });
                    }}
                  >
                    <FavoritesItemCard
                      average_rating={data.average_rating}
                      description={data.description}
                      favourite={data.favourite}
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      ingredients={data.ingredients}
                      name={data.name}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      special_ingredient={data.special_ingredient}
                      toggleFavouriteItem={toggleFavourite}
                      type={data.type}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
