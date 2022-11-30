import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../../components/Text";
import Title from "../../components/Title";
import { i18nContext } from "../../context/i18nContext";
import { COLORS } from "../../theme";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Header from "../../components/Header";

export default function FormSubmitted() {
  const { i18n } = useContext(i18nContext);
  const {top: paddingTop} = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container }} >
    <Header title="getAJob" back />
      <View style={{paddingHorizontal: 14}}>
        <View style={styles.textContainer}>
          <Icon name="check-circle-outline" size={64} color={COLORS.blue} />
          <Text align="center" primary size={28} fontFamily="Lato-Light">
            {i18n.t('thankyou')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: '50%',
    marginHorizontal: '25%',
    width: 200
  },
});
