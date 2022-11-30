import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { COLORS, SIZES } from "../theme";
import Service, { ServiceProps } from "../components/Service";
import Social, { SocialProps } from "../components/Social";
import Section from "../components/Section";
import Layout from "../theme/Layout";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import NewCard from "../components/NewCard";
import VideoCard from "../components/VideoCard";
import { VideoProp } from "../components/Video";

const services: ServiceProps[] = [
  {
    title: "findAJob",
    description: "description",
    icon: "file-find-outline",
    colors: ["#065f46", COLORS.green],
    route: "Jobs" as never,
  },
  {
    title: "consultations",
    description: "description",
    icon: "calendar-check",
    colors: ["#1e3a8a", "#0077FF"],
    route: "Consultations" as never,
  },
  {
    title: "findLawyer",
    description: "description",
    icon: "scale-unbalanced",
    colors: ["#3730a3", "#6C63FF"],
    route: "Lawyer" as never,
  },
];

const socials: SocialProps[] = [
  {
    icon: require("../../assets/images/facebook.png"),
  },
  {
    icon: require("../../assets/images/instagram.jpg"),
  },
  {
    icon: require("../../assets/images/youtube.png"),
  },
];

export type ItemProp = {
  id: number;
  title: string;
  contentPreview: string;
  content: string;
  date: string;
  img: ImgType;
  categories: number[];
};

export type CategoryProp = {
  id: number;
  title: string;
  selected: boolean;
};

export type ImgType = {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
};

export default function Home() {
  const { top: paddingTop } = useSafeAreaInsets();
  const [news, setNews] = React.useState<ItemProp[]>([]);
  const [videos, setVideos] = React.useState<VideoProp[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  //Functions
  const getPosts = async () => {
    const items: ItemProp[] = [];
    try {
      const data = (
        await axios.get(`https://inmigrarhoy.com/wp-json/wp/v2/posts/?_embed`, {
          params: {
            page: 1,
            per_page: 1,
          },
          headers: {
            responseType: "json",
          },
        })
      ).data;

      data.forEach((item: any) => {
        const media_details =
          item._embedded["wp:featuredmedia"][0].media_details;
        let img: ImgType = {} as ImgType;

        if (Layout.window.width >= 150 && Layout.window.width <= 300) {
          img = media_details.sizes.thumbnail;
        } else if (Layout.window.width > 300 && Layout.window.width <= 768) {
          img = media_details.sizes.medium_large;
        } else if (Layout.window.width > 768 && Layout.window.width <= 800) {
          img = media_details.sizes.full;
        } else img = media_details.sizes.large;

        items.push({
          id: item.id,
          title: item.title.rendered,
          contentPreview: item.excerpt.rendered,
          content: item.content.rendered.replace(/(<([^>]+)>)/gi, ""),
          date: item.date,
          img,
          categories: item.categories,
        });
      });
      setNews(items);
    } catch (err) {}
  };

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
          width: "48%",
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
          width: "48%",
          title:
            "Abogado Eduardo Soto da su opinion acerca de la reunificacion familiar de los Cubanos.",
        },
      ]);
    } finally {
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getPosts();
      await getVideos();
      setLoading(false);
    };

    loadData();
  }, []);

  const { bottom } = useSafeAreaInsets();
  const { navigate }: any = useNavigation();

  return !loading ? (
    <View style={{ ...styles.container }}>
      <Header title="inmigrationService" />
      <ScrollView
        contentInset={{
          bottom: bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: SIZES.s }}
      >
        <View style={{ marginHorizontal: SIZES.xs }}>
          <Section title="news" style={{ marginTop: 29 }} hasMore>
            {news.map((item: ItemProp, index: number) => (
              <NewCard
                {...item}
                key={index}
                route={() =>
                  navigate("NewsDetails", {
                    data: { ...item },
                  })
                }
              />
            ))}
          </Section>

          {videos.length > 0 ? (
            <Section title="videos">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {videos.map((video: VideoProp, index: number) => (
                  <VideoCard
                    {...video}
                    key={index}
                    height={170}
                    route={() =>
                      navigate("VideoDetails", {
                        data: { ...video },
                      })
                    }
                    preview
                  />
                ))}
              </View>
            </Section>
          ) : null}
          <Section title="services">
            {services.map((service: ServiceProps, index: number) => (
              <Service
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                colors={service.colors}
                route={service.route}
              />
            ))}
          </Section>

          <View style={styles.socialContainer}>
            {socials.map((social: SocialProps, index: number) => (
              <Social key={index} icon={social.icon} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <LoadingScreen textColor={COLORS.black} />
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
  description: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
    letterSpacing: 0,
    marginTop: 13,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
});
