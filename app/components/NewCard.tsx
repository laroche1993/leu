import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Layout from "../theme/Layout";
import { COLORS } from "../theme";
import Text from "./Text";
import { LinearGradient } from "expo-linear-gradient";
import CacheImage from "./CacheImage";
import { CardProps } from "../constants/types";

export default function NewCard(props: CardProps) {
  const {
    height = Layout.window.height * 0.27,
    title,
    img,
    size,
    route,
    preview,
  } = props;

  const positions = {
    bottom: preview ? 0: 20,
    left: preview ? 5: 25,
    right: preview ? 20: 25,
  }
  
  return (
    <TouchableOpacity onPress={route}>
      <View style={styles.container}>
        <CacheImage
          uri={img.source_url}
          style={{ ...styles.image, height }}
        >
          <LinearGradient
            start={{ x: 0.5, y: 3 }}
            end={{ x: 1, y: 0.001 }}
            colors={["#00000000", "rgba(0,0,0,0.4)"]}
            style={{ height: "100%", width: "100%", borderRadius:8 }}
          ></LinearGradient>
        </CacheImage>
        <View style={{...styles.titleContainer, ...positions}}>
          <Text
            fontFamily="Lato-Regular"
            color={COLORS.white}
            size={size}
            style={styles.textStyles}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 26,
  },
  image: {
    width: "100%",
    overflow: 'hidden'
  },
  titleContainer: {
    position: "absolute",
  },
  textStyles: {
    
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent",
  },
});
