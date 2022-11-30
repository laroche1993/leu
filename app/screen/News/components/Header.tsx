import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../../theme";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import MenuPopUp from "../../../components/Menu";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Home" as never)}>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <Icon name="chevron-left" size={32} />
          <Image
            
            style={styles.headerButtonLeft}
            source={require("../../../../assets/favicon.png")}
          />
        </View>
      </Pressable>
      <View>
        <MenuPopUp />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backcground: COLORS.white,
    borderBottomWidth: 0.3,
    height: 45,
    borderBottomColor: COLORS.graylight,

  },
  headerButtonLeft: {
    marginLeft: -20,
    width: 70,
    height: 60,
    marginTop: -5,
    paddingBottom: -2
  },
});
