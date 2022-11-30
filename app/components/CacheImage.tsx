import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

export default function CacheImage({ uri, style, children }: any) {
  const [source, setSource] = React.useState<ImageSourcePropType>({});

  useEffect(() => {
    const loadImage = async () => {
      if (uri !== undefined) {
        const name = shorthash.unique(uri);
        const path = `${FileSystem.cacheDirectory}${name}`;
        const image = await FileSystem.getInfoAsync(path);

        if (image.exists) {
          setSource({ uri: image.uri });
          return;
        }

        const newImage = await FileSystem.downloadAsync(uri, path);
        setSource({ uri: newImage.uri });
      }
    };
    loadImage();
  }, [uri]);
  return (
    <ImageBackground
      resizeMode="cover"
      borderRadius={8}
      style={style}
      source={source}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
