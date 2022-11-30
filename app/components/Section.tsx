import { Pressable, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../theme";
import Text from "./Text";
import { i18nContext } from "../context/i18nContext";
import { useNavigation } from "@react-navigation/native";

type SectionProps = {
  title?: string;
  hasMore?: boolean;
  fullContentUri?: string;
  fullTagText?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
};
export default function Section({
  title,
  hasMore,
  fullContentUri,
  children,
  style,
  fullTagText = " news",
}: SectionProps) {
  const { i18n } = useContext(i18nContext);
  const navigation = useNavigation()
 
  return (
    <View style={style}>
      <Text style={{ ...styles.subheader, marginBottom: 18 }}>
        {title && i18n.t(title)}
      </Text>
      {children}
      {hasMore && (
        <Pressable style={{marginTop: 6, height: 48}} onPress={()=>navigation.navigate('News' as never)}>
          <Text style={{top: -12}} align="right">{i18n.t("readAll")}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subheader: {
    fontSize: 30,
    color: COLORS.primary,
  },
});
