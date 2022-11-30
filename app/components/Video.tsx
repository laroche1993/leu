import {
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Layout from "../theme/Layout";
import { COLORS } from "../theme";
import Text from "./Text";
import { useNavigation } from "@react-navigation/native";
import CacheImage from "./CacheImage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export type VideoProp = {
  id: string|number;
  width?: number | string;
  img: string;
  thumbnails?: string;
  uri: string;
  title?: string;
  size?: number;
  fullContent?: string;
  content?: string;
  date: string;
  route?: string;
  playing?: boolean
};
export default function Video(props: VideoProp) {
  const navigator = useNavigation();
  const { width = "100%", title, img, size, route,playing } = props;

  return (
    <View style={styles.videoContainer}>
      <CacheImage uri={img} style={styles.image} >
      <LinearGradient
            start={{ x: 0.5, y: 3 }}
            end={{ x: 1, y: 0.001 }}
            colors={["#00000000", "rgba(0,0,0,0.4)"]}
            style={{ height: "100%", width: "100%", borderRadius:8 }}
          ></LinearGradient>
      </CacheImage>
      <View style={styles.titleContainer}>
        {playing && <Icon name="youtube" size={56} style={{position: 'absolute',top: -100, color: COLORS.red}} />}
        <Text style={{paddingHorizontal: 10,margin: 10}} fontFamily="Lato-Bold" color={COLORS.white} size={size}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: Layout.window.height * 0.25,
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    width: 250,
  },
});
