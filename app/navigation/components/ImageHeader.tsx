import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ImageHeader({ back }: any) {
  const navigation = useNavigation<any>();
  const marginLeft = !back ? -15 : 0;
  return (
    <Pressable onPress={() => back ? navigation.goBack(): navigation.navigate("Home")}>
      <Image
        style={{ ...styles.headerButtonLeft, marginLeft }}
        source={require("../../../assets/favicon.png")}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerButtonLeft: {
    width: 60,
    height: 70,
  },
});
