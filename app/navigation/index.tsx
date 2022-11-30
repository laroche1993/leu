import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "@react-navigation/native";
import { COLORS } from "../theme";
import TabNavigator from "../screen/TabNavigator";
import NewsDetails from "../screen/News/NewsDetails";
import { MenuProvider } from "react-native-popup-menu";
import Privacy from "../screen/Privacy";
import VideoDetails from "../screen/News/VideoDetails";
import FormSubmitted from "../screen/Jobs/FormSubmitted";
export default function Navigation() {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.primary,
      background: COLORS.background,
    },
  };
  return (
    <NavigationContainer theme={customTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

type MainStackParamList = {
  MainScreen: undefined;
  NewsDetails: undefined;
  Privacy: undefined;
  VideoDetails: undefined;
  FormSubmitted: undefined;
};

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<MainStackParamList>();

  return (
    <MenuProvider>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainScreen" component={TabNavigator} />
        <RootStack.Screen name="NewsDetails" component={NewsDetails} />
        <RootStack.Screen name="VideoDetails" component={VideoDetails} />
        <RootStack.Screen name="Privacy" component={Privacy } />
        <RootStack.Screen name="FormSubmitted" component={FormSubmitted } />
      </RootStack.Navigator>
    </MenuProvider>
  );
};
