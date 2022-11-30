import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import Section from "../../components/Section";
import { COLORS, SIZES } from "../../theme";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { i18nContext } from "../../context/i18nContext";
import { CategoryProp, ImgType, ItemProp } from "../Home";
import Layout from "../../theme/Layout";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import NewCard from "../../components/NewCard";

type Pagination = {
  page: number;
  per_page: number;
  offset: number;
  total: number;
  totalNews: number;
};
export default function News() {
  const { bottom, top: paddingTop } = useSafeAreaInsets();
  const { i18n } = useContext(i18nContext);

  const [news, setNews] = React.useState<ItemProp[]>([]);
  const [categories, setCategories] = React.useState<CategoryProp[]>([]);
  const [active, setActive] = React.useState<CategoryProp>({} as CategoryProp);
  const [filtered, setFiltered] = React.useState<ItemProp[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [pagination, setPagination] = React.useState<Pagination>({
    offset: 1,
    page: 1,
    per_page: 10,
    total: 10,
    totalNews: 10,
  });
  //Functions
  const getPosts = async ({ page, per_page, offset }: Pagination) => {
    const items: ItemProp[] = news.length === 0 ? [] : news;

    try {
      const data = (
        await axios.get(
          `https://inmigrarhoy.com/wp-json/wp/v2/posts/?_embed&page=${page}&per_page=${per_page}&offset=${offset}`,
          {
            headers: {
              responseType: "json",
            },
          }
        )
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
      setFiltered(items);
    } catch (err) {
    } finally {
    }
  };
  const getCategories = async () => {
    const items: CategoryProp[] = [];

    const data = (
      await axios.get("https://inmigrarhoy.com/wp-json/wp/v2/categories", {
        headers: {
          responseType: "json",
        },
      })
    ).data;
    data.forEach((item: any, index: number) => {
      items.push({
        id: item.id,
        title: item.name,
        selected: false,
      });
    });
    setCategories(items);
  };
  const addMoreNews = () => {
    let { total, offset, page, totalNews, per_page } = pagination;

    total += 10;
    offset += 10;

    if (total % 100 === 0) {
      page += 1;
    }

    totalNews += 10;
    setPagination({ total, offset, page, totalNews, per_page });
    getPosts({ page, per_page, offset } as Pagination);
  };
  const setActiveButton = (idCategory: number) => {
    categories.forEach((item: CategoryProp) => {
      item.selected = item.id === idCategory;
    });

    setCategories(categories);
    setActive(categories.find((item: CategoryProp) => item.selected)!);
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const filterNews = (e: any = "") => {
    setQuery(e);
    setFiltered(
      news.filter(
        (item: ItemProp) =>
          item.title.toLowerCase().includes(e) ||
          item.content.toLowerCase().includes(e.toLowerCase())
      )
    );
  };

  const resetFiltering = () => {
    setQuery("");
    filterNews("");
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getPosts(pagination);
      await getCategories();
      setLoading(false);
    };
    loadData();
  }, []);

  const { navigate }: any = useNavigation();

  return (
    <View style={{ ...styles.container }}>
      <Header title="news" />
      <Spinner
        animation="fade"
        overlayColor={COLORS.blackOpacity}
        visible={loading}
        textContent={i18n.t("loading")}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ marginHorizontal: SIZES.xs, marginTop: SIZES.s }}>
        <View style={{ marginTop: 10 }}>
          <Input
            value={query}
            iconRight={query !== "" ? "close" : undefined}
            onPressRight={resetFiltering}
            onChangeText={(e) => filterNews(e)}
            iconLeft="magnify"
            placeholder={i18n.t("search")}
            placeholderTextColor={COLORS.gray}
            style={{ borderRadius: 32 }}
          />
        </View>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item: CategoryProp) => (
            <Button
              key={item.id}
              title={item.title
                .substring(0, 1)
                .toUpperCase()
                .concat(item.title.substring(1).toLowerCase())}
              style={{
                backgroundColor: item.selected ? COLORS.blue : "#cbd5e1",
                height: Platform.OS ==='android'? 48 : 42,
                width: 150,
              }}
              onPress={() => setActiveButton(item.id)}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        contentInset={{
          bottom: bottom + 120,
        }}
        contentContainerStyle={{top: -paddingTop+20}}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            addMoreNews();
          }
        }}
      >
        <View style={{ marginHorizontal: SIZES.xs }}>
          <Section>
            {filtered
              .filter((item: ItemProp) => {
                let activeCat = categories.find(
                  (cat: CategoryProp) => cat.selected
                );
                const cat =
                  activeCat !== undefined ? activeCat.id : item.categories[0];
                return item.categories.includes(cat);
              })
              .map((item: ItemProp, index: number) => (
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
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
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  scrollView: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? -30 : 20,
  },
});
