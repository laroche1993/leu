import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import TabBar from "../navigation/components/TabBar";
import News from "./News/News";
import Consultations from "./Consultations/Consultations";
import Jobs from "./Jobs/Jobs";
import Lawyer from "./Lawyer/Lawyer";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
       headerShown: false
      }}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Consultations" component={Consultations} />
      <Tab.Screen name="Jobs" component={Jobs} />
      <Tab.Screen name="Lawyer" component={Lawyer} />
    </Tab.Navigator>
  );
}
