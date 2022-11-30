import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "../components/Header";
import Text from "../components/Text";
import { COLORS } from "../theme";

export default function Privacy() {
  return (
    <View style={{ ...styles.container }}>
      <Header title="privacy" back />
      <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <View style={{ paddingHorizontal: 14 }}>
                <View style={styles.imageContainer}>
                  <Text
                    align="center"
                    primary
                    weight="bold"
                    style={{ marginTop: 10 }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec dictum, eros quis sodales aliquam, orci augue egestas
                    mi, et blandit nibh tortor quis est.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec dictum, eros quis sodales aliquam, orci augue egestas
                    mi, et blandit nibh tortor quis est.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec dictum, eros quis sodales aliquam, orci augue egestas
                    mi, et blandit nibh tortor quis est.
                  </Text>
                </View>
              </View>
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textHeader: {
    fontSize: 48,
    color: COLORS.primary,
  },
  subheader: {
    fontSize: 30,
    color: COLORS.primary,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    alignContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 12,
    width: 180,
    marginBottom: 20,
  },
});
