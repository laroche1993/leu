import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../components/Text";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../theme";
import moment from 'moment'
import CacheImage from "../../components/CacheImage";
import Header from "../../components/Header";

export default function NewsDetails({ navigation, route }: any) {
  const { bottom, top: paddingTop } = useSafeAreaInsets();
  const { title, date, img, content } = route.params.data;
  
  return (
    <View style={{ ...styles.container }}>
    <Header title="news" back/>
    <ScrollView
      contentInset={{
        bottom: bottom + 16,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginTop: SIZES.s }}
    >
       <View style={{marginHorizontal: SIZES.xs}}>
       <View>
          <CacheImage style={styles.image} uri={img.source_url} />
        </View>
        <View style={{ marginTop: 40 }}>
          <Text color={COLORS.primary} size={22}>
            {title}
          </Text>
          <Text color={COLORS.primary} style={{ marginBottom: 40 }} h3>
            {moment(date).format('DD MMMM YYYY')}
          </Text>
        </View>
        <View>
          <Text align="justify" size={18} fontFamily="Lato-Bold">
            {content}
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
    backgroundColor: COLORS.white
  },
  image: {
    height: 280,
    width: "100%",
    borderRadius: 8,
  },
});
