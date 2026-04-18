// 1. Виправлено назву функції в імпорті на useThemeManager
import { useThemeManager } from "~/hooks/useThemeManager";
import { StyleSheet, Text, type TextProps } from "react-native";

/**
 * Основний компонент для відображення тексту з підтримкою тем.
 */

export type TypographyVariant =
  | "regular"
  | "header"
  | "semiBold"
  | "subHeader"
  | "anchor";

export interface AppTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  variant?: TypographyVariant;
}

export const AppTypography = ({
  style,
  lightColor,
  darkColor,
  variant = "regular",
  ...props
}: AppTextProps) => {
  

  const textColor = useThemeManager(
    { light: lightColor, dark: darkColor },
    "textMain" 
  );

  const variantStyles = {
    regular: ui.base,
    header: ui.header,
    semiBold: ui.semiBold,
    subHeader: ui.subHeader,
    anchor: ui.anchor,
  };

  return (
    <Text
      style={[{ color: textColor }, variantStyles[variant], style]}
      {...props}
    />
  );
};

const ui = StyleSheet.create({
  base: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  semiBold: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
  },
  header: {
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
  },
  subHeader: {
    fontSize: 19,
    fontWeight: "600",
  },
  anchor: {
    fontSize: 15,
    lineHeight: 28,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});