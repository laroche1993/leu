import {
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext } from "react";
import ImageHeader from "../navigation/components/ImageHeader";
import MenuPopUp from "./Menu";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../theme";
import Title from "./Title";
import { i18nContext } from "../context/i18nContext";
import Text from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  back?: boolean;
  title: string;
};
export default function Header({ back = false, title }: Props) {
  const { navigate } = useNavigation();
  const { i18n } = useContext(i18nContext);
  const { top: fromTop } = useSafeAreaInsets();

  const paddingTop = Platform.OS === "ios" ? fromTop : fromTop - 30;
  return (
    <View style={styles.headerWrapper}>
      <ImageBackground
        style={{
          shadowRadius: 20,
          shadowColor: COLORS.black,
          shadowOpacity: 0.7,
          shadowOffset: {
            width: 1,
            height: 5,
          },
        }}
        imageStyle={{
          borderRadius: 32,
        }}
        source={require("../../assets/images/banner.jpg")}
      >
        <View style={{ paddingTop }}>
          <View style={styles.container}>
            <View style={styles.alignContent}>
              <View style={styles.alignContent}>
                {back && (
                  <Icon
                    name="chevron-left"
                    size={38}
                    style={{ marginRight: -15, marginLeft: -15 }}
                    onPress={() => navigate("Home" as never)}
                  />
                )}
                <ImageHeader back={back} />
              </View>
              <MenuPopUp />
            </View>
            <Title subtitles={title} />
            <Text color={COLORS.white} style={styles.description}>
              {i18n.t("homeIntro")}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "none",
    marginBottom: 10,
    height: 320
  },
  alignContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    marginHorizontal: SIZES.m,
  },

  description: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    letterSpacing: 0,
    marginTop: 13,
    paddingBottom: 20,
    shadowColor: COLORS.black,
    elevation: 5,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 1,
  },
});
