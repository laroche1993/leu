import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS } from "../theme";
import Text from "./Text";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Animated, { FadeInUp, Layout as L } from "react-native-reanimated";
import { i18nContext } from "../context/i18nContext";
import Layout from "../theme/Layout";

type QuestionProps = {
  id: number,
  title: string;
  color?: string;
  borderless?: boolean;
  icon?: boolean;
  answers: any[];
  selected: boolean;
  onSelect: (id: any) => void;
};
export default function Question({
  id,
  borderless = false,
  color,
  icon = true,
  title,
  answers,
  selected = true,
  onSelect,
}: QuestionProps) {
const {i18n} = useContext(i18nContext)
  return (
    <Pressable onPress={() => onSelect({id, title, answers})}>
      <View style={{ ...styles.container }}>
        <Text style={{width: Layout.window.width-80}} fontFamily="Lato-Light" color={COLORS.black} size={20}>
          {i18n.t(title)}
        </Text>
        {icon && <Icon name="chevron-down"  size={28} color="#64748b" />}
      </View>

      {answers.length > 0 ? (
        answers.map((item: any) => (
          <View key={item.id}>
            {selected && (
              <Animated.View
                entering={FadeInUp}
                layout={L.springify()}
                style={{ ...styles.content }}
              >
                <Text
                  style={{ marginLeft: 32, marginVertical: 8 }}
                  size={18}
                  fontFamily="Lato-Regular"
                >
                  {i18n.t(item.title)}
                </Text>
              </Animated.View>
            )}
          </View>
        ))
      ) : (
        <></>
      )}
      <View
        style={{
          borderBottomWidth: borderless ? 0 : 1,
          borderBottomColor: "#cbd5e1",
          marginTop: 5,
        }}
      ></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 24,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
