import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../theme";
import Text from "./Text";
import { i18nContext } from "../context/i18nContext";

type TitleProps = {
  title?: string;
  subtitles?: string;
};
export default function Title({
  title = "Legal en USA,",
  subtitles,
}: TitleProps) {
  

 const {i18n}: any = useContext(i18nContext)

  return (
    <View>
      
      <Text fontFamily="Lato-Bold" style={{ ...styles.textHeader,...styles.shadow, color: "#60a5fa" }}>{title}</Text>
      <Text fontFamily="Lato-Bold" style={{...styles.subheader, ...styles.shadow}} color="#38bdf8" weight="200">
        {i18n.t(subtitles as string)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 32,
  
  },
  subheader: {
    fontSize: 30,
    marginTop: 0
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOpacity: 1
  }
});
