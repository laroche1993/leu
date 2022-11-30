import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import Text from "../../components/Text";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../theme";
import Video, { VideoProp } from "../../components/Video";
import VideoCard from "../../components/VideoCard";
import Header from "../../components/Header";
import axios from "axios";
import moment from "moment";
import i18n from "../../i18n/translations";

export default function VideoDetails({ navigation, route }: any) {
  const {
    id,
    title,
    date,
    thumbnails,
    img,
    uri,
    width = "100%",
  }: VideoProp = route.params.data;
  const [videos, setVideos] = useState<VideoProp[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [selected, setSelected] = useState<VideoProp>({
    id,
    thumbnails,
    img,
    uri,
    date,
    width: "100%",
    title,
  });

  const { bottom, top: paddingTop } = useSafeAreaInsets();

  const getVideos = async () => {
    const items: VideoProp[] = [];
    try {
      const data = (
        await axios.get(`https://www.googleapis.com/youtube/v3/search?`, {
          params: {
            order: "date",
            part: "snippet",
            channelId: "UCQmwHh5sDKlAB8ElwVnHk0Q",
            maxResults: 2,
            key: "AIzaSyAgK7XTevhCMp0PB-9LUGFgv3R_hDiP5PI",
          },
          headers: {
            responseType: "json",
          },
        })
      ).data;
      data.items.map((item: any) => {
        items.push({
          id: item.id.videoId,
          thumbnails: item.snippet.thumbnails.medium.url,
          img: item.snippet.thumbnails.high.url,
          uri: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          date: item.snippet.publishedAt,
          width: "48%",
          title: item.snippet.title,
        });
      });

      setVideos(items);
    } catch (err) {
      setVideos([
        {
          id: "BQtXVm3vMtw",
          thumbnails:
            "https://www.freepnglogos.com/uploads/youtube-play-red-logo-png-transparent-background-6.png",
          img: "https://i.ytimg.com/vi/tcywlRxWKVk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCdoQHaSNHivPb174wKEAxLdFqxWQ",
          uri: `https://www.youtube.com/watch?v=BP_F-Tt83-I`,
          date: "3 Oct 2022",
          title:
            "El Dr. Soto en esta entrevista para Telemundo. Liberan a madre del nino nicaraguense.",
        },
        {
          id: "4ltOhkMHrTc",
          thumbnails:
            "https://www.freepnglogos.com/uploads/youtube-play-red-logo-png-transparent-background-6.png",
          img: "https://i.ytimg.com/vi/gYj26bEqUxA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA1lDj_osk0USJcn_2azZXoK24lSA",
          uri: `https://www.youtube.com/watch?v=4ltOhkMHrTc`,
          date: "3 Oct 2022",
          title:
            "Abogado Eduardo Soto da su opinion acerca de la reunificacion familiar de los Cubanos.",
        },
        {
          id: "B3JGI4EUQvo",
          thumbnails:
            "https://www.freepnglogos.com/uploads/youtube-play-red-logo-png-transparent-background-6.png",
          img: "https://i.ytimg.com/vi/y12E5LUPnPY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAO7ivkh12p26jg8a5hkN_3EDPDvg",
          uri: `https://www.youtube.com/watch?v=B3JGI4EUQvo`,
          date: "3 Oct 2022",
          title:
            "Ley del Perdón: para quienes han estado ilegales - E Soto inmigracion explica.",
        },
        {
          id: "Zxmn7sUdYn0",
          thumbnails:
            "https://www.freepnglogos.com/uploads/youtube-play-red-logo-png-transparent-background-6.png",
          img: "https://i.ytimg.com/an_webp/UDTlBB9PEiI/mqdefault_6s.webp?du=3000&sqp=CJz--JkG&rs=AOn4CLCoQpz264k0xXvggzl62OO2SoUmaA",
          uri: `https://www.youtube.com/watch?v=Zxmn7sUdYn0`,
          date: "3 Oct 2022",
          title:
            "10 de julio, 2018 programa en vivo, Eduardo Soto Abogado Inmigracion.",
        },
      ]);
    } finally {
    }
  };

  const goVideoChannel = async () => {
    const url = "https://www.youtube.com/c/legalenusa";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getVideos();
      setLoading(false);
    };

    loadData();
  }, []);
  return (
    <View style={{ ...styles.container }}>
      <Header title="news" back />
      <ScrollView
        contentInset={{
          bottom: bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: SIZES.s }}
      >
        <View style={{ marginHorizontal: SIZES.xs }}>
          <VideoCard isPlaying {...selected} />
          <View>
            <Text color={COLORS.primary} size={22}>
              {selected.title}
            </Text>
            <Text color={COLORS.primary} style={{ marginBottom: 40 }} h3>
              {selected.date}
            </Text>
          </View>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {videos.map((video: VideoProp, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelected(video);
                }}
              >
                <Video playing={video.id === selected.id} {...video} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Pressable onPress={goVideoChannel}>
          <Text
            style={{ marginTop: 10, marginHorizontal: SIZES.xs }}
            align="right"
          >
            {i18n.t("seeAll")}
          </Text>
          </Pressable>
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
  videoContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 250,
  },
  image: {
    height: 280,
    width: "100%",
    borderRadius: 8,
  },
});
