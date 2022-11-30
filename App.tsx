import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "./app/context/themeContext";
import useCachedResources from "./app/hooks/useCachedResources";
import Navigation from "./app/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nProvider } from "./app/context/i18nContext";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <I18nProvider>
            <Navigation />
            <StatusBar style="auto" />
          </I18nProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
