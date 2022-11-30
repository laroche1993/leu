import { Image, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { COLORS } from "../theme";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Text from "./Text";
import { i18nContext } from "../context/i18nContext";

export default function MenuPopUp() {
  const { updateLang }: any = useContext(i18nContext);
  const [lang, setLang] = useState<any>(
    require("../../assets/images/flags/es.png")
  );
  const changeLang = async (lang: string) => {
    updateLang(lang);
    setLang(
      lang === "es"
        ? require("../../assets/images/flags/es.png")
        : require("../../assets/images/flags/en.png")
    );
  };

  return (
    <View>
      <Menu style={{ marginRight: 8 }}>
        <MenuTrigger>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.image} source={lang} />
           {/*  <Icon name="chevron-down" size={24} /> */}
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ borderRadius: 12 }}>
          <MenuOption disabled={true}>
            <Text size={20}>Seleccione idioma</Text>
          </MenuOption>
          <MenuOption style={{height: 48}} onSelect={() => changeLang("es")}>
            <View style={styles.lang}>
              <Image
                style={styles.image}
                source={require("../../assets/images/flags/es.png")}
              />
              <Text style={{ color: COLORS.primary }}>ES</Text>
            </View>
          </MenuOption>
          <MenuOption style={{height: 48}} onSelect={() => changeLang("en")}>
            <View style={styles.lang}>
              <Image
                style={styles.image}
                source={require("../../assets/images/flags/en.png")}
              />
              <Text style={{ color: COLORS.primary }}>EN</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  lang: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 30,
    borderRadius: 6,
    marginRight: 2,
  },
});
