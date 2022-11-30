import React from 'react';
import { StyleSheet, Text as DefaultText, TextStyle } from 'react-native';
import { FontType } from '../constants/fonts';
import { COLORS } from '../theme';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  primary?: boolean;
  success?: boolean;
  error?: boolean;
  secondary?: boolean;
  secondary2?: boolean;
  caption?: boolean;
  color?: TextStyle['color'];
  size?: TextStyle['fontSize'];
  align?: TextStyle['textAlign'];
  weight?: TextStyle['fontWeight'];
  opacity?: TextStyle['opacity'];
  fontFamily?: FontType;
  style?: TextStyle;
  children?: JSX.Element | JSX.Element[] | string | any;
}

const Text: React.FC<Props> = (props) => {
  const {
    // typography props,
    h1,
    h2,
    h3,
    h4,
    h5,
    primary,
    success,
    error,
    secondary,
    secondary2,
    caption,
    // base props
    fontFamily,
    color,
    size,
    weight,
    opacity,
    align,
    style,
    children,
    ...otherProps
  } = props;

  const textStyles = StyleSheet.flatten([
    styles.default,
    h1 !== undefined && styles.h1,
    h2 !== undefined && styles.h2,
    h3 !== undefined && styles.h3,
    h4 !== undefined && styles.h4,
    h5 !== undefined && styles.h5,
    primary !== undefined && styles.primary,
    success !== undefined && styles.success,
    error !== undefined && styles.error,
    secondary !== undefined && styles.secondary,
    secondary2 !== undefined && styles.secondary2,
    caption !== undefined && styles.caption,
    size !== undefined && { fontSize: size },
    color !== undefined && { color },
    weight !== undefined && { fontWeight: weight },
    align !== undefined && { textAlign: align },
    fontFamily !== undefined && { fontFamily },
    opacity !== undefined && { opacity },
    style,
  ]);

  return (
    <DefaultText style={textStyles} {...otherProps}>
      {children}
    </DefaultText>
  );
};

export default Text;

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Lato-Regular',
    color: COLORS.gray,
    fontSize: 18,
  },
  h1: {
    fontFamily: 'Lato-Bold',
    fontSize: 50.7,
    letterSpacing: 0,
    color: COLORS.secondary,
  },
  h2: {
    fontFamily: 'Lato-Bold',
    fontSize: 32,
    letterSpacing: 0,
    color: COLORS.gray,
  },
  primary: {
    fontFamily: 'Lato-Bold',
    fontSize: 18.4,
    letterSpacing: 0,
    color: COLORS.primary,
  },
  success: {
    fontFamily: 'Lato-Black',
    fontSize: 18,
    letterSpacing: 0,
    color: COLORS.green,
    lineHeight: 36,
  },
  error: {
    fontFamily: 'Lato-Black',
    fontSize: 17.6,
    letterSpacing: 0,
    color: COLORS.red,
    lineHeight: 28,
  },
  secondary: {
    fontFamily: 'Lato-Black',
    fontSize: 18,
    letterSpacing: 0,
    color: COLORS.secondary,
  },
  secondary2: {
    fontFamily: 'Lato-Black',
    fontSize: 16,
    letterSpacing: 0,
    color: COLORS.secondary,
  },
  h3: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    letterSpacing: 0,
    color: COLORS.gray,
  },
  h4: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    letterSpacing: 0,
    color: COLORS.gray,
  },
  h5: {
    fontFamily: 'Lato-Bold',
    fontSize: 10,
    letterSpacing: 0,
    color: COLORS.gray,
  },
  caption: {
    fontFamily: 'Lato-Black',
    fontSize: 8,
    letterSpacing: 0,
    color: COLORS.black,
  },
});
