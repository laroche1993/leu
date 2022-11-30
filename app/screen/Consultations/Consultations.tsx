import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import { COLORS, SIZES } from "../../theme";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Question from "../../components/Question";
import { i18nContext } from "../../context/i18nContext";
import Header from "../../components/Header";

const getQuestions = (): any[] => {
  const fakes: any[] = [];
  for (let i = 0; i < 80; i++) {
    fakes.push({
      id: i + 1,
      title: `question_${i + 1}`,
      answers: [
        {
          id: 1,
          title: `answerQuestion_${i + 1}`,
        },
      ],
    });
  }
  return fakes;
};

export default function Consultations({ navigation }: any) {
  const { top: paddingTop } = useSafeAreaInsets();
  const { i18n } = useContext(i18nContext);
  const { bottom } = useSafeAreaInsets();

  const [questions, setQuestions] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>(getQuestions());
  const [query, setQuery] = useState<string>("");
  const handleQuestions = (question: any) => {
    const alreadySelected = questions.findIndex(
      (item: any) => item.id === question.id
    );
    if (alreadySelected >= 0) {
      const filteredQuestions = questions.filter(
        (item: any) => item.id !== question.id
      );
      const newQuestions = [...filteredQuestions];
      setQuestions(filteredQuestions);
    } else {
      const newQuestions = [...questions, question];
      setQuestions(newQuestions);
    }
  };

  const goContact = async () => {
    const url = "https://calendly.com/citalegalenusa/";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const search = (val: string) => {
    setQuery(val);

    const result = getQuestions().filter(
      (item: any, index: number) =>
        i18n.t(item.title).toLowerCase().includes(val.toLowerCase()) ||
        i18n.t(item.answers[0].title).toLowerCase().includes(val.toLowerCase())
    );

    setFiltered(result);
  };

  const resetFiltering = () => {
    setQuery("")
    search('')
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Header title="consultations" />
        <ScrollView
          contentInset={{
            bottom: bottom + 16,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.s }}
          scrollEventThrottle={200}
        >
          <View style={{ marginHorizontal: SIZES.xs }}>
            <View>
             
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/Question.png")}
                />
                <Text
                  align="center"
                  primary
                  weight="200"
                  style={{ marginTop: 20 }}
                >
                  {i18n.t("consultationIntro")}
                </Text>
                <Button
                  style={styles.contactUs}
                  title={i18n.t("contactUs")}
                  onPress={goContact}
                />
              </View>
              <Input
                value={query}
                iconRight={query !== "" ? "close" : undefined}
                onPressRight={resetFiltering}
                onChangeText={search}
                iconLeft="magnify"
                placeholder={i18n.t("search")}
                placeholderTextColor={COLORS.gray}
                style={{
                  borderRadius: 32,
                }}
              />
            </View>
            <View>
              {filtered.map((item: any) => (
                <Question
                  key={item.id}
                  selected={
                    questions.findIndex(
                      (question: any) => question.id === item.id
                    ) >= 0
                  }
                  onSelect={handleQuestions}
                  {...item}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  contactUs: {
    backgroundColor: COLORS.blue,
    borderRadius: 12,
    width: 180,
    marginTop: 20,
  },
});
