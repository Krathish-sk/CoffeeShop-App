import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Text, StyleSheet, View } from "react-native";
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_100Thin,
} from "@expo-google-fonts/poppins";

import { DetailsScreen, PaymentScreen } from "./screens";
import TabNavigator from "./navigators/TabNavigator";
import { store } from "./features/store";
import { COLORS, FONTFAMILY, FONTSIZE } from "./theme/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Black": Poppins_900Black,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
    "Poppins-ExtraLight": Poppins_200ExtraLight,
    "Poppins-Light": Poppins_300Light,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Thin": Poppins_100Thin,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primaryBlackHex,
        }}
      ></View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Tab"
        >
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ animation: "slide_from_bottom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
