import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../theme";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Layout from "../theme/Layout";
import { LinearGradient } from "expo-linear-gradient";
import Text from "./Text";
import { useNavigation } from "@react-navigation/native";
import { i18nContext } from "../context/i18nContext";

export type ServiceProps = {
  title: string;
  description: string;
  icon: string | any;
  colors: string[];
  route: never;
};

export default function Service({
  title,
  description,
  icon,
  colors,
  route,
}: ServiceProps) {
  const navigation = useNavigation();
  const { i18n } = useContext(i18nContext);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0.007}} end={{x: 0, y: 1}}
          colors={colors}
          style={{
            ...styles.gradient,
            borderRadius: 8,
            height: 150,
          }}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text h2 fontFamily="Lato-Light" color={COLORS.white}>
              {i18n.t(title)}
            </Text>
            <Text h3 color={COLORS.white} style={styles.subtitleWrapper}>
              {i18n.t(description)}
            </Text>
          </View>
          <View>
            <Icon
              name={icon}
              color={COLORS.white}
              size={64}
              style={{ fontWeight: "100" }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "10%",
    marginHorizontal: "8%",
  },
  titleWrapper: {
    maxWidth: 250,
  },
  subtitleWrapper: {
    marginTop: 6,
    lineHeight: 24
  },
  gradient: {
    width: "100%",
    position: "absolute",
    height: Layout.window.height * 0.25,
    backgroundColor: 'transparent'
  },
});
