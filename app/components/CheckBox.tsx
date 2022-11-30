import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Text from "./Text";
import { COLORS } from "../theme";

type CheckBoxProps = {
  label?: string;
  selected?: boolean;
};
export default function CheckBox({ label, selected }: CheckBoxProps) {
  const [enabled, setEnabled] = useState(selected);
  return (
    <View style={styles.container}>
        <Pressable onPress={() => setEnabled(!enabled)}>
        {enabled ? (
          <Icon color={COLORS.blue} size={32} name="checkbox-marked" />
        ) : (
          <Icon color={COLORS.blue} size={32} name="checkbox-blank-outline" />
        )}
        </Pressable>
        {label && <Text color={COLORS.blue}>{label}</Text>}
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
