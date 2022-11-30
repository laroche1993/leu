import { useContext, useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FONTS } from "../constants/fonts";
import { i18nContext } from "../context/i18nContext";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const {i18n}: any = useContext(i18nContext);
  

  useEffect(() => {
    const loadResourceandDataAsync = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...FONTS,
        });
      } catch (err) {
        console.warn(err);
      } finally {
        setIsLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    };

    void loadResourceandDataAsync();
  }, [i18n]);

  return isLoadingComplete;
}
