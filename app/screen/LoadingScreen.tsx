import React, { useContext } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS } from "../theme";
import { i18nContext } from "../context/i18nContext";

type loadingProps = {
  animation?: "fade" | "none" | "slide";
  overlayColor?: string;
  textContent?: string;
  textColor?: string;
};
export default function LoadingScreen({
  animation = "fade",
  overlayColor = COLORS.white,
  textContent = "loading",
  textColor = COLORS.black,
}: loadingProps) {
  const { i18n } = useContext(i18nContext);

  return (
    <Spinner
      animation={animation}
      overlayColor={overlayColor}
      visible={true}
      textContent={i18n.t(textContent)}
      textStyle={{ color: textColor }}
    />
  );
}
