import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";

import { COLORS } from "../theme/theme";
import {
  HomeScreen,
  CartScreen,
  OrderHistoryScreen,
  FavoritesScreen,
} from "../screens";
import { BlurView } from "@react-native-community/blur";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBars,
        tabBarBackground: () => {
          <BlurView
            overlayColor=""
            style={styles.BlurViewStyle}
            blurAmount={15}
          />;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <SimpleLineIcons
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="cart-outline"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <SimpleLineIcons
                name="like"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="archive-outline"
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBars: {
    position: "absolute",
    height: 50,
    backgroundColor: COLORS.primaryBlackHex,
    borderTopWidth: 0,
    borderTopColor: "transparent",
    elevation: 0,
    opacity: 0.9,
  },
  BlurViewStyle: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
