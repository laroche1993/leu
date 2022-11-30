import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Layout from "../theme/Layout";
import { COLORS } from "../theme";
import Text from "./Text";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoCard(props: any) {
  const navigator = useNavigation();
  const {
    id,
    width = "100%",
    height = Layout.window.height * 0.27,
    title,
    img,
    size,
    route,
    preview,
    isPlaying,
  } = props;

  const positions = {
    bottom: preview ? 0 : 20,
    left: preview ? 5 : 25,
    right: preview ? 20 : 25,
  };
  return isPlaying ? (
    <View>
      <YoutubePlayer webViewStyle={{borderRadius: 8, borderBottomEndRadius: 8}} height={height} play={true} videoId={id} />
    </View>
  ) : (
    <TouchableOpacity style={{ width }} onPress={route}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: img }}
          style={{ ...styles.image, height }}
        >
          <LinearGradient
            start={{ x: 0.5, y: 3 }}
            end={{ x: 1, y: 0.001 }}
            colors={["#00000000", "rgba(0,0,0,0.4)"]}
            style={{ height: "100%", width: "100%", borderRadius: 8 }}
          ></LinearGradient>
        </ImageBackground>
        <View style={{ ...styles.titleContainer, ...positions }}>
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
    borderRadius: 12,
  },
  image: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  titleContainer: {
    position: "absolute",
  },
  textStyles: {},
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "transparent",
  },
});
